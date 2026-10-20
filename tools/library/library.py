#!/usr/bin/env python3
"""Helpers for tools/library/*.sh (docs/content-library.md). Run from the repo root."""
import datetime, json, os, re, sys, tomllib

LIB = "landing/src/content/library"
COVERS = "landing/src/data/guide-covers.ts"
PROMPTS = "landing/public/img/prompts.toml"
SCHED = tomllib.load(open("tools/library/schedule.toml", "rb"))


def fm(slug):
    return open(f"{LIB}/{slug}.md").read().split("\n---")[0]


def field(text, key):
    m = re.search(rf'^{key}:\s*"?(.*?)"?\s*$', text, re.M)
    return m.group(1) if m else ""


def drafts():
    """Hidden drafts in publish order (same order as landing/scripts/publish-library.mjs)."""
    out = []
    for f in sorted(os.listdir(LIB)):
        t = fm(f[:-3])
        if re.search(r"^visible:\s*true\s*$", t, re.M):
            continue
        p = int(field(t, "priority") or 5)
        out.append((p, f, f[:-3]))
    return [s for _, _, s in sorted(out)]


def has_cover(slug, covers=None):
    return f'"{slug}":' in (covers or open(COVERS).read())


def per_day(day=None):
    day = day or datetime.date.today()
    n = (day - datetime.date.fromisoformat(SCHED["start"])).days
    if n < 0:
        return 0
    for ph in SCHED["phase"]:
        if "days" not in ph or n < ph["days"]:
            return ph["per_day"]
        n -= ph["days"]
    return SCHED["phase"][-1]["per_day"]


def this_run(hour):
    d, k = per_day(), SCHED["runs_per_day"]
    slot = min(hour * k // 24, k - 1)
    return d // k + (1 if slot < d % k else 0)


def main():
    cmd, *a = sys.argv[1:]
    covers = open(COVERS).read()
    if cmd == "run-count":  # how many to publish now
        print(this_run(int(a[0]) if a else datetime.datetime.now().hour))
    elif cmd == "need-covers":  # slugs to make covers for now, in publish order
        q = drafts()
        ready = sum(1 for s in q if has_cover(s, covers))
        target = per_day() * SCHED["covers"]["buffer_days"]
        want = min(SCHED["covers"]["per_run"], max(0, target - ready + SCHED["covers"]["per_run"]))
        if ready >= target:
            want = 0
        print("\n".join([s for s in q if not has_cover(s, covers)][:want]))
    elif cmd == "meta":  # headline and answer for a slug
        t = fm(a[0])
        print(json.dumps({"headline": field(t, "headline"), "answer": field(t, "answer")}))
    elif cmd == "sky":  # rotate sky colors by cover count
        skies = ["coral #FF6B5B", "sun yellow #F2C230", "sky cyan #2FA7E0", "lilac #B9A3E3"]
        print(skies[covers.count("img:") % 4])
    elif cmd == "add-cover":  # slug img alt prompt
        slug, img, alt, prompt = a
        esc = lambda s: s.replace("\\", "\\\\").replace('"', '\\"')
        entry = f'  "{slug}": {{\n    img: "{img}",\n    alt: "{esc(alt)}",\n  }},\n'
        i = covers.index("\n};", covers.index("guideCovers"))
        open(COVERS, "w").write(covers[: i + 1] + entry + covers[i + 1 :])
        with open(PROMPTS, "a") as f:
            f.write(f'\n[[image]]\nfile = "img/{img}-*.webp"\nprompt = "{esc(prompt)}"\n'
                    f'model = "gemini-3-pro-image via omp (tools/library/covers.sh); Real-ESRGAN x4"\n'
                    f'date = "{datetime.date.today()}"\n')
    elif cmd == "stats":
        q = drafts()
        print(f"hidden={len(q)} with_cover={sum(has_cover(s, covers) for s in q)} per_day={per_day()}")
    else:
        sys.exit(f"unknown command {cmd}")


main()
