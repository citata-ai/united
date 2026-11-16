#!/usr/bin/env python3
"""H03-E1 update 2 (B034): which source domains each engine uses, per city and over time.

Reads cities.csv (made by cities_analyze.py) from two or more run folders of cities.toml, oldest first, and writes
sources.json to the last folder. The research page reads it for its "Update 2: the sources" section.

What it measures, per engine and date (answers = one engine's answer for one city):
  - answers with at least one source, source domains per answer
  - top domains: answers that used each domain (union of each date's top 15)
  - core domains: in the engine's top 10 on every date
  - per city, newest date: the domains each engine used
  - watch list: the domains of the Goodjuju 30-city study (2026-10-30), as answers per engine and date

Only engines that have answers on the newest date count. A domain matches itself and its subdomains
(reviews.birdeye.com counts as birdeye.com).

Usage: python3 -I tools/ai-visibility/cities_sources.py <run dir> [<run dir> ...] <newest run dir>
Stdlib only.
"""
import csv, json, os, sys
from collections import Counter, defaultdict

# Sources in the Goodjuju study's top 11 that are web domains (Google Business Profiles is not one), plus birdeye.com,
# bbb.org and trustanalytica.org (in Goodjuju's ChatGPT list or our top 15).
WATCH = ["expertise.com", "propertymanagement.com", "ipropertymanagement.com", "yelp.com", "biggerpockets.com",
         "reddit.com", "awning.com", "bestinhood.com", "mynd.co", "thumbtack.com", "birdeye.com", "bbb.org",
         "trustanalytica.org", "threebestrated.com"]


def base(dom, keys):
    for k in keys:
        if dom == k or dom.endswith("." + k):
            return k
    return dom


def load(d):
    rows = list(csv.DictReader(open(os.path.join(d, "cities.csv"))))
    for r in rows:
        r["doms"] = sorted({base(x, WATCH) for x in r["source_domains"].split("; ") if x})
    return rows


def main():
    dirs = sys.argv[1:]
    runs = [load(d) for d in dirs]
    dates = [rr[0]["date"] for rr in runs]
    engines = sorted({r["engine"] for r in runs[-1]})
    by = {e: {} for e in engines}
    for date, rr in zip(dates, runs):
        for e in engines:
            ans = [r for r in rr if r["engine"] == e]
            if not ans:
                continue
            c = Counter(d for r in ans for d in r["doms"])
            by[e][date] = {
                "answers": len(ans),
                "answers_with_any_source": sum(1 for r in ans if r["doms"]),
                "avg_sources": round(sum(len(r["doms"]) for r in ans) / len(ans), 1),
                "distinct_domains": len(c),
                "counts": c,
            }
    out = {"experiment": "H03-E1", "backlog": "B034", "dates": dates, "engines": {}, "watch": [], "cities": []}
    for e in engines:
        ds = [d for d in dates if d in by[e]]
        top = []
        for d in ds:
            for dom, _ in by[e][d]["counts"].most_common(15):
                if dom not in top:
                    top.append(dom)
        newest = by[e][ds[-1]]["counts"]
        top.sort(key=lambda x: (-newest[x], -sum(by[e][d]["counts"][x] for d in ds), x))
        core = [x for x in top if all(x in dict(by[e][d]["counts"].most_common(10)) for d in ds)]
        out["engines"][e] = {
            "dates": ds,
            "per_date": {d: {k: v for k, v in by[e][d].items() if k != "counts"} for d in ds},
            "top": [{"domain": x, **{d: by[e][d]["counts"][x] for d in ds}} for x in top[:20]],
            "core": core,
        }
    for dom in WATCH:
        out["watch"].append({"domain": dom, **{e: {d: by[e][d]["counts"][dom] for d in out["engines"][e]["dates"]} for e in engines}})
    city = defaultdict(dict)
    order = {}
    for r in runs[-1]:
        city[(r["city"], r["state"])][r["engine"]] = r["doms"]
        order[(r["city"], r["state"])] = int(r["pop_rank"])
    for (c, s), m in sorted(city.items(), key=lambda kv: order[kv[0]]):
        shared = sorted(set.intersection(*(set(v) for v in m.values()))) if len(m) == len(engines) else []
        out["cities"].append({"rank": order[(c, s)], "city": c, "state": s, "engines": m, "shared": shared})
    out["cities_with_shared"] = sum(1 for x in out["cities"] if x["shared"])
    out["cities_compared"] = len(out["cities"])
    path = os.path.join(dirs[-1], "sources.json")
    json.dump(out, open(path, "w"), indent=1)
    print(path)
    for e in engines:
        print(e, out["engines"][e]["per_date"], "core:", out["engines"][e]["core"])
        for t in out["engines"][e]["top"][:12]:
            print("  ", t)
    print("cities with a shared domain:", out["cities_with_shared"], "of", out["cities_compared"])


if __name__ == "__main__":
    main()
