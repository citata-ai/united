#!/usr/bin/env python3
"""B024 / H03: AI-readiness of the property manager sites that AI cites in the H03 city index.

Reads cities.csv from an H03 run, takes every source domain that cities_analyze.py types as "company"
(a manager's own site), and fetches three public files per site: /robots.txt, /llms.txt and the home page.
It writes, in an output folder:
  sites.json   one row per domain (has the domain: gitignored, never commit, the repo is public)
  sites.csv    public download: no domain, no company name, only a row number and the checks
  summary.json counts for the research page

We do not name a company in the public files (Tao rule, backlog B024).

Usage:
  python3 -I tools/ai-visibility/readiness_audit.py \
    business/marketing/ai-visibility/cities-2026-10/2026-10-19 business/marketing/ai-visibility/readiness-2026-10
  Add --reuse to rebuild summary.json and sites.csv from sites.json without a new crawl.
Stdlib only.
"""
import csv, hashlib, json, os, re, ssl, sys, urllib.error, urllib.request
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cities_analyze import source_type  # noqa: E402

UA = "Mozilla/5.0 (compatible; citata-research/1.0; +https://citata.ai/research/ai-readiness-property-managers-2026)"
TIMEOUT = 20
# AI crawlers we check in robots.txt. Training and search bots are both here; the page groups them.
BOTS = {
    "GPTBot": "openai", "OAI-SearchBot": "openai", "ChatGPT-User": "openai",
    "ClaudeBot": "anthropic", "Claude-SearchBot": "anthropic", "Claude-User": "anthropic",
    "PerplexityBot": "perplexity", "Google-Extended": "google", "Bingbot": "microsoft", "CCBot": "commoncrawl",
}
SEARCH_BOTS = ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "PerplexityBot", "Bingbot"]
PRICE_LINK = re.compile(r"""<a\b[^>]*href=["'][^"']*(pric|fee|cost|rate)[^"']*["'][^>]*>|<a\b[^>]*>[^<]{0,60}\b(pricing|fees|our fees|cost|rates)\b""", re.I)
LDJSON = re.compile(r"""<script[^>]+type=["']application/ld\+json["'][^>]*>(.*?)</script>""", re.I | re.S)


def fetch(url):
    ctx = ssl.create_default_context()
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT, context=ctx) as r:
            body = r.read(1_500_000).decode("utf-8", "replace")
            return r.status, r.headers.get("Content-Type", ""), body, r.geturl()
    except urllib.error.HTTPError as e:
        return e.code, e.headers.get("Content-Type", "") if e.headers else "", "", url
    except Exception as e:  # DNS, TLS, timeout
        return 0, "", type(e).__name__, url


def robots_groups(text):
    """Parse robots.txt into {agent_lower: [(directive, path)]}. Consecutive User-agent lines share a group."""
    groups, agents, last_was_agent = {}, [], False
    for raw in text.splitlines():
        line = raw.split("#", 1)[0].strip()
        if ":" not in line:
            continue
        k, v = (x.strip() for x in line.split(":", 1))
        k = k.lower()
        if k == "user-agent":
            if not last_was_agent:
                agents = []
            agents.append(v.lower())
            groups.setdefault(v.lower(), [])
            last_was_agent = True
        elif k in ("allow", "disallow"):
            for a in agents:
                groups[a].append((k, v))
            last_was_agent = False
        else:
            last_was_agent = False
    return groups


def blocks_root(groups, bot):
    """True when the bot's group (or '*' when it has none) disallows the whole site."""
    rules = groups.get(bot.lower())
    if rules is None:
        rules = groups.get("*", [])
    dis = any(k == "disallow" and v == "/" for k, v in rules)
    allow_root = any(k == "allow" and v in ("/", "/$") for k, v in rules)
    return dis and not allow_root


def ld_types(html):
    types = set()
    for block in LDJSON.findall(html):
        for t in re.findall(r'"@type"\s*:\s*(\[[^\]]*\]|"[^"]*")', block):
            types.update(re.findall(r'"([^"]+)"', t))
    return sorted(types)


def audit(dom):
    base = f"https://{dom}"
    row = {"domain": dom}
    st, ct, body, _ = fetch(base + "/robots.txt")
    row["robots_status"] = st
    is_robots = st == 200 and "<html" not in body[:500].lower()
    row["robots_ok"] = is_robots
    groups = robots_groups(body) if is_robots else {}
    row["robots_names_ai_bot"] = any(b.lower() in groups for b in BOTS)
    row["blocked_bots"] = [b for b in BOTS if is_robots and blocks_root(groups, b)]
    row["sitemap_in_robots"] = bool(is_robots and re.search(r"(?im)^\s*sitemap\s*:", body))

    st, ct, body, final = fetch(base + "/llms.txt")
    text_like = "html" not in ct.lower() and "<html" not in body[:500].lower() and "<!doctype" not in body[:500].lower()
    row["llms_status"] = st
    row["llms_txt"] = bool(st == 200 and text_like and body.strip())

    st, ct, body, final = fetch(base + "/")
    row["home_status"] = st
    ok = st == 200 and "html" in ct.lower()
    row["home_ok"] = ok
    types = ld_types(body) if ok else []
    row["schema_types"] = types
    row["schema_any"] = bool(types)
    row["schema_business"] = any(t in types for t in ("LocalBusiness", "RealEstateAgent", "Organization", "ProfessionalService",
                                                      "Corporation", "HomeAndConstructionBusiness"))
    row["schema_rating"] = ok and ('"aggregateRating"' in body or '"AggregateRating"' in body)
    row["schema_faq"] = "FAQPage" in types
    row["price_link"] = bool(ok and PRICE_LINK.search(body))
    row["https_final"] = final.startswith("https://")
    return row


def res_date(out):
    """Crawl date: kept in crawl_date.txt so --reuse does not change it."""
    p = os.path.join(out, "crawl_date.txt")
    if not os.path.exists(p):
        open(p, "w").write(date.today().isoformat())
    return open(p).read().strip()


def mean_cites(pool):
    return round(sum(r["answers_citing"] for r in pool) / len(pool), 2) if pool else 0.0


def main():
    src, out = sys.argv[1], sys.argv[2]
    os.makedirs(out, exist_ok=True)
    rows = list(csv.DictReader(open(os.path.join(src, "cities.csv"))))
    cites = Counter()
    for r in rows:
        companies = [c.strip() for c in r["companies_in_order"].split(";") if c.strip()]
        for d in (x.strip() for x in r["source_domains"].split(";")):
            if d and source_type(d, companies) == "company":
                cites[d.removeprefix("www.")] += 1
    doms = sorted(cites)
    print(f"{len(doms)} company-site domains", file=sys.stderr)
    if "--reuse" in sys.argv:
        res = json.load(open(os.path.join(out, "sites.json")))
    else:
        with ThreadPoolExecutor(12) as ex:
            res = list(ex.map(audit, doms))
        for r in res:
            r["answers_citing"] = cites[r["domain"]]
        json.dump(res, open(os.path.join(out, "sites.json"), "w"), indent=1)

    reach = [r for r in res if r["home_ok"]]
    n, m = len(res), len(reach)

    def cnt(key, pool):
        return sum(bool(r[key]) for r in pool)

    def pct(a, b):
        return round(100 * a / b, 1) if b else 0.0

    bot_blocks = {b: sum(b in r["blocked_bots"] for r in res if r["robots_ok"]) for b in BOTS}
    summary = {
        "date": res_date(out), "source_run": os.path.basename(src.rstrip("/")),
        "sites": n, "home_reachable": m, "answers_citing_total": sum(cites.values()),
        "robots_ok": cnt("robots_ok", res), "robots_names_ai_bot": cnt("robots_names_ai_bot", res),
        "sitemap_in_robots": cnt("sitemap_in_robots", res),
        "blocks_any_ai_bot": sum(bool(r["blocked_bots"]) for r in res),
        "blocks_any_search_bot": sum(any(b in SEARCH_BOTS for b in r["blocked_bots"]) for r in res),
        "bot_blocks": bot_blocks,
        "llms_txt": cnt("llms_txt", res),
        "schema_any": cnt("schema_any", reach), "schema_business": cnt("schema_business", reach),
        "schema_rating": cnt("schema_rating", reach), "schema_faq": cnt("schema_faq", reach),
        "price_link": cnt("price_link", reach),
        "top_schema_types": Counter(t for r in reach for t in r["schema_types"]).most_common(12),
    }
    # Mean answers citing a site, with vs without each check. Correlation only, not cause.
    summary["mean_cites"] = {
        k: {"with": mean_cites([r for r in pool if r[k]]), "without": mean_cites([r for r in pool if not r[k]]),
            "n_with": sum(bool(r[k]) for r in pool), "n_without": sum(not r[k] for r in pool)}
        for k, pool in (("llms_txt", res), ("robots_names_ai_bot", res), ("schema_business", reach),
                        ("schema_faq", reach), ("schema_rating", reach), ("price_link", reach))
    }
    summary["sites_cited_2plus"] = sum(r["answers_citing"] >= 2 for r in res)
    for k in ("robots_ok", "robots_names_ai_bot", "sitemap_in_robots", "blocks_any_ai_bot", "blocks_any_search_bot", "llms_txt"):
        summary["pct_" + k] = pct(summary[k], n)
    for k in ("schema_any", "schema_business", "schema_rating", "schema_faq", "price_link"):
        summary["pct_" + k] = pct(summary[k], m)
    json.dump(summary, open(os.path.join(out, "summary.json"), "w"), indent=1)

    cols = ["robots_ok", "robots_names_ai_bot", "sitemap_in_robots", "llms_txt", "home_ok", "schema_any",
            "schema_business", "schema_rating", "schema_faq", "price_link"]
    with open(os.path.join(out, "sites.csv"), "w", newline="") as f:
        w = csv.writer(f)
        # Row order is a hash of the domain and the count is a band, so a row cannot be matched to the index CSV.
        w.writerow(["date", "site", "answers_citing_band"] + cols + ["blocked_ai_bots", "schema_types"])
        ordered = sorted(res, key=lambda r: hashlib.sha256(r["domain"].encode()).hexdigest())
        for i, r in enumerate(ordered, 1):
            n_cite = r["answers_citing"]
            band = "1" if n_cite == 1 else "2-4" if n_cite <= 4 else "5+"
            w.writerow([summary["date"], f"site-{i:03d}", band] + [r[c] for c in cols]
                       + ["; ".join(r["blocked_bots"]), "; ".join(r["schema_types"])])
    print(json.dumps(summary, indent=1))


if __name__ == "__main__":
    main()
