#!/usr/bin/env python3
"""AI visibility check: does our brand show up in AI answers?

Runs every prompt in prompts.toml on ChatGPT, Gemini and Claude (each with
live web search) through the fleet CLIProxyAPI, then records mentions, rank,
cited domains and the companies the AI recommends instead.

Usage:
  python3 tools/ai-visibility/run.py [--runs 1] [--only id1,id2] [--engines chatgpt,gemini,claude]

Env:
  CLIPROXY_URL   default http://100.111.1.1:8317
  CLIPROXY_KEY   default: contents of ~/.config/cliproxy/api-key
Output: <out_dir from prompts.toml>/<date>/ (answers.jsonl, mentions.csv, report.md)
"""
import argparse, concurrent.futures as cf, csv, datetime as dt, json, os, re, sys, time, tomllib, urllib.error, urllib.request
from collections import Counter, defaultdict
from urllib.parse import urlparse

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
CFG = {}
BASE = os.environ.get("CLIPROXY_URL", "http://100.111.1.1:8317")
KEY = os.environ.get("CLIPROXY_KEY") or open(os.path.expanduser("~/.config/cliproxy/api-key")).read().strip()

ENGINES = {
    "chatgpt": "gpt-6-luna",       # OpenAI Responses API + web_search (closest to ChatGPT search)
    "gemini": "gemini-3-flash",    # Gemini + Google Search grounding (closest to AI Overviews / Gemini)
    "claude": "claude-sonnet-5-5", # Claude + web_search
}
EXTRACTOR = "claude-haiku-4-5"


def post(path, body, timeout=240):
    req = urllib.request.Request(BASE + path, data=json.dumps(body).encode(), headers={
        "Authorization": "Bearer " + KEY, "x-api-key": KEY, "x-goog-api-key": KEY,
        "content-type": "application/json", "anthropic-version": "2023-06-01"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            err = f"HTTP {e.code}: {e.read().decode()[:300]}"
            if e.code < 500 and e.code != 429:
                raise RuntimeError(err)
        except Exception as e:  # network / timeout
            err = str(e)
        time.sleep(5 * (attempt + 1))
    raise RuntimeError(err)


def ask_chatgpt(q):
    d = post("/v1/responses", {"model": ENGINES["chatgpt"], "input": q, "tools": [{"type": "web_search"}]})
    text, urls = [], []
    for o in d.get("output", []):
        if o.get("type") == "message":
            for c in o.get("content", []):
                if c.get("type") == "output_text":
                    text.append(c.get("text", ""))
                    urls += [a.get("url") for a in c.get("annotations", []) if a.get("type") == "url_citation"]
    return "\n".join(text), urls


def ask_gemini(q):
    d = post(f"/v1beta/models/{ENGINES['gemini']}:generateContent",
             {"contents": [{"parts": [{"text": q}]}], "tools": [{"google_search": {}}]})
    c = (d.get("candidates") or [{}])[0]
    text = "\n".join(p.get("text", "") for p in c.get("content", {}).get("parts", []) if not p.get("thought"))
    gm = c.get("groundingMetadata", {})
    # Gemini returns redirect URIs; the title holds the source domain.
    urls = [ch.get("web", {}).get("title") or ch.get("web", {}).get("uri") for ch in gm.get("groundingChunks", [])]
    return text, urls


def ask_claude(q):
    d = post("/v1/messages", {"model": ENGINES["claude"], "max_tokens": 2000,
                              "messages": [{"role": "user", "content": q}],
                              "tools": [{"type": "web_search_20250305", "name": "web_search", "max_uses": 4}]})
    text, urls = [], []
    for b in d.get("content", []):
        if b.get("type") == "text":
            text.append(b.get("text", ""))
            urls += [c.get("url") for c in (b.get("citations") or []) if c.get("url")]
        if b.get("type") == "web_search_tool_result" and isinstance(b.get("content"), list):
            urls += [r.get("url") for r in b["content"] if r.get("url")]
    return "".join(text), urls


ASK = {"chatgpt": ask_chatgpt, "gemini": ask_gemini, "claude": ask_claude}


def extract_companies(answer):
    """Ordered list of company names the answer recommends."""
    if not answer.strip():
        return []
    d = post("/v1/messages", {"model": EXTRACTOR, "max_tokens": 600, "messages": [{"role": "user", "content":
        "From the answer below, list the " + CFG.get("entity", "companies") + " it names, in the order they first "
        "appear. Return only a JSON array of strings, no prose. Normalise names (drop LLC/Inc).\n\n" + answer[:12000]}]})
    txt = "".join(b.get("text", "") for b in d.get("content", []) if b.get("type") == "text")
    m = re.search(r"\[.*\]", txt, re.S)
    try:
        return [s.strip() for s in json.loads(m.group(0)) if isinstance(s, str)] if m else []
    except json.JSONDecodeError:
        return []


def domain(u):
    if not u:
        return ""
    if "://" not in u:
        return u.lower().removeprefix("www.")
    return urlparse(u).netloc.lower().removeprefix("www.")


def run_one(p, engine, run, brand_re, our_domain):
    t = time.time()
    try:
        answer, urls = ASK[engine](p["text"])
        err = ""
    except Exception as e:
        answer, urls, err = "", [], str(e)[:300]
    companies = extract_companies(answer) if answer else []
    doms = [domain(u) for u in urls if u]
    rank = next((i + 1 for i, c in enumerate(companies) if brand_re.search(c)), None)
    return {
        "date": dt.date.today().isoformat(), "prompt_id": p["id"], "group": p["group"], "prompt": p["text"],
        "engine": engine, "model": ENGINES[engine], "run": run, "seconds": round(time.time() - t, 1),
        "mentioned": bool(brand_re.search(answer)), "rank": rank, "n_companies": len(companies),
        "cited_us": any(our_domain in d for d in doms), "companies": companies,
        "cited_domains": sorted(set(doms)), "answer": answer, "error": err,
    }


def previous(out, ok):
    """Mention rate of the last earlier run next to this one: the loop's delta."""
    base = os.path.dirname(out)
    dates = sorted(d for d in os.listdir(base) if d < os.path.basename(out) and os.path.exists(os.path.join(base, d, "mentions.csv")))
    if not dates:
        return ["", "First run: this is the baseline (point A)."]
    prev = [r for r in csv.DictReader(open(os.path.join(base, dates[-1], "mentions.csv"))) if not r["error"]]
    lines = ["", f"## Change since {dates[-1]} (non-brand)", "", "| Engine | Mentions before | Mentions now | Cites before | Cites now |", "| --- | --- | --- | --- | --- |"]
    for e in sorted({r["engine"] for r in ok}):
        a = [r for r in prev if r["engine"] == e and r["group"] != "brand"]
        b = [r for r in ok if r["engine"] == e and r["group"] != "brand"]
        n = lambda rr, k: sum(str(r[k]) == "True" for r in rr)
        lines.append(f"| {e} | {n(a, 'mentioned')}/{len(a)} | {n(b, 'mentioned')}/{len(b)} | {n(a, 'cited_us')}/{len(a)} | {n(b, 'cited_us')}/{len(b)} |")
    return lines


def report(rows, out):
    ok = [r for r in rows if not r["error"]]
    lines = [f"# AI visibility — {rows[0]['date']}", "",
             f"Prompts: {len({r['prompt_id'] for r in rows})} · engines: {', '.join(sorted({r['engine'] for r in rows}))} · answers: {len(ok)} ok / {len(rows) - len(ok)} failed", ""]
    lines += ["## Mention rate", "", "| Engine | Answers | Mentions us | Cites our site |", "| --- | --- | --- | --- |"]
    for e in sorted({r["engine"] for r in ok}):
        rr = [r for r in ok if r["engine"] == e]
        lines.append(f"| {e} | {len(rr)} | {sum(r['mentioned'] for r in rr)} | {sum(r['cited_us'] for r in rr)} |")
    lines += previous(out, ok)
    lines += ["", "## By prompt group (non-brand)", "", "| Group | Answers | Mentions us |", "| --- | --- | --- |"]
    for g in sorted({r["group"] for r in ok}):
        rr = [r for r in ok if r["group"] == g]
        lines.append(f"| {g} | {len(rr)} | {sum(r['mentioned'] for r in rr)} |")
    comp = Counter(c for r in ok if r["group"] != "brand" for c in set(r["companies"]))
    lines += ["", "## Companies AI recommends (non-brand prompts, answers that name them)", "", "| Company | Answers |", "| --- | --- |"]
    lines += [f"| {c} | {n} |" for c, n in comp.most_common(30)]
    doms = Counter(d for r in ok for d in r["cited_domains"])
    lines += ["", "## Sources AI cites (targets for listings / outreach)", "", "| Domain | Answers |", "| --- | --- |"]
    lines += [f"| {d} | {n} |" for d, n in doms.most_common(30)]
    lines += ["", "## Where we are mentioned", ""]
    hits = [r for r in ok if r["mentioned"]]
    lines += [f"- {r['engine']} · `{r['prompt_id']}` · rank {r['rank'] or '—'}" for r in hits] or ["- none"]
    open(os.path.join(out, "report.md"), "w").write("\n".join(lines) + "\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--runs", type=int, default=1)
    ap.add_argument("--only", default="")
    ap.add_argument("--engines", default=",".join(ENGINES))
    ap.add_argument("--workers", type=int, default=6)
    a = ap.parse_args()
    cfg = tomllib.load(open(os.path.join(HERE, "prompts.toml"), "rb"))
    CFG.update(cfg)
    prompts = [p for p in cfg["prompt"] if not a.only or p["id"] in a.only.split(",")]
    brand_re = re.compile("|".join(re.escape(b) for b in cfg["brand"]), re.I)
    out = os.path.join(ROOT, cfg.get("out_dir", "docs/marketing/research/ai-visibility"), dt.date.today().isoformat())
    os.makedirs(out, exist_ok=True)
    jobs = [(p, e, r) for p in prompts for e in a.engines.split(",") for r in range(1, a.runs + 1)]
    rows = []
    with cf.ThreadPoolExecutor(a.workers) as ex:
        futs = [ex.submit(run_one, p, e, r, brand_re, cfg["our_domain"]) for p, e, r in jobs]
        for i, f in enumerate(cf.as_completed(futs), 1):
            r = f.result(); rows.append(r)
            print(f"[{i}/{len(jobs)}] {r['engine']:8} {r['prompt_id']:20} mentioned={r['mentioned']} rank={r['rank']} {r['error'][:80]}", flush=True)
    rows.sort(key=lambda r: (r["prompt_id"], r["engine"], r["run"]))
    with open(os.path.join(out, "answers.jsonl"), "w") as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    with open(os.path.join(out, "mentions.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["prompt_id", "group", "engine", "run", "mentioned", "rank", "n_companies", "cited_us", "top_companies", "error"])
        for r in rows:
            w.writerow([r["prompt_id"], r["group"], r["engine"], r["run"], r["mentioned"], r["rank"] or "", r["n_companies"], r["cited_us"], "; ".join(r["companies"][:5]), r["error"]])
    report(rows, out)
    print("written", out)


if __name__ == "__main__":
    main()
