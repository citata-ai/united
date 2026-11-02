#!/usr/bin/env python3
"""H03-E1 update: compare two runs of cities.toml (same prompts, same models, other date).

Reads summary.json and cities.csv from two run folders (made by cities_analyze.py) and writes change.json
to the newer folder. The research page reads change.json for its "Update" section.

What it measures:
  - overall and per-engine numbers on both dates
  - name retention: for each city and engine, the share of names in the old answer that the new answer names again
  - cities whose most-named company stayed the same
  - source domains: answers per domain on both dates (top 20 of either date)
  - national brands: answers on both dates

Usage: python3 -I tools/ai-visibility/cities_compare.py <old run dir> <new run dir>
Stdlib only.
"""
import csv, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cities_analyze import brand, compact, norm  # noqa: E402

KEYS = ("avg_companies", "pct_names_local", "pct_with_national", "pct_with_listing_site", "pct_with_company_site",
        "pct_with_forum", "avg_sources")


def load(d):
    s = json.load(open(os.path.join(d, "summary.json")))
    rows = {}
    for r in csv.DictReader(open(os.path.join(d, "cities.csv"))):
        names = [c for c in r["companies_in_order"].split("; ") if c]
        rows[(r["city"], r["state"], r["engine"])] = {brand(c) or compact(norm(c)) for c in names}
        rows[(r["city"], r["state"], r["engine"])].discard("")
    return s, rows


def main():
    old_dir, new_dir = sys.argv[1], sys.argv[2]
    a, ra = load(old_dir)
    b, rb = load(new_dir)
    da, db = a["overall"]["dates"][0], b["overall"]["dates"][0]

    def pair(x, y):
        return {k: {"old": x[k], "new": y[k], "delta": round(y[k] - x[k], 1)} for k in KEYS}

    overall = pair(a["overall"], b["overall"])
    for k in ("distinct_companies", "cities_with_full_agreement", "distinct_domains", "answers", "answers_failed"):
        overall[k] = {"old": a["overall"][k], "new": b["overall"][k], "delta": b["overall"][k] - a["overall"][k]}
    engines = sorted(set(a["by_engine"]) & set(b["by_engine"]))
    by_engine = {e: pair(a["by_engine"][e], b["by_engine"][e]) for e in engines}

    # Name retention per engine: old names that the same engine names again for the same city.
    kept_e = {e: [0, 0] for e in engines}
    new_e = {e: [0, 0] for e in engines}
    same_set = {e: 0 for e in engines}
    zero_overlap = {e: 0 for e in engines}
    pairs = {e: 0 for e in engines}
    for key, old in ra.items():
        e = key[2]
        if key not in rb or e not in kept_e or not old:
            continue
        new = rb[key]
        pairs[e] += 1
        kept_e[e][0] += len(old & new)
        kept_e[e][1] += len(old)
        new_e[e][0] += len(new - old)
        new_e[e][1] += len(new)
        same_set[e] += old == new
        zero_overlap[e] += not (old & new)
    retention = {e: {"pairs": pairs[e], "old_names": kept_e[e][1], "kept": kept_e[e][0],
                     "pct_kept": round(100 * kept_e[e][0] / kept_e[e][1], 1) if kept_e[e][1] else 0.0,
                     "new_names": new_e[e][0], "pct_new": round(100 * new_e[e][0] / new_e[e][1], 1) if new_e[e][1] else 0.0,
                     "same_list": same_set[e], "no_name_kept": zero_overlap[e]} for e in engines}
    tk, to = sum(v["kept"] for v in retention.values()), sum(v["old_names"] for v in retention.values())
    retention["all"] = {"pairs": sum(v["pairs"] for v in retention.values()), "old_names": to, "kept": tk,
                        "pct_kept": round(100 * tk / to, 1) if to else 0.0,
                        "same_list": sum(v["same_list"] for v in retention.values()),
                        "no_name_kept": sum(v["no_name_kept"] for v in retention.values())}

    # Cities: did the most-named company stay the same? Did the engines still agree on a name?
    cb = {(c["city"], c["state"]): c for c in b["cities"]}
    top_same, agree_both, cities = 0, 0, []
    for c in a["cities"]:
        n = cb.get((c["city"], c["state"]))
        if not n:
            continue
        ta = c["top_companies"][0]["name"] if c["top_companies"] else None
        tb = n["top_companies"][0]["name"] if n["top_companies"] else None
        same = bool(ta and tb and compact(norm(ta)) == compact(norm(tb)))
        top_same += same
        agree_both += bool(c["named_by_all_engines"]) and bool(n["named_by_all_engines"])
        cities.append({"rank": c["rank"], "city": c["city"], "state": c["state"], "top_same": same,
                       "agree_old": bool(c["named_by_all_engines"]), "agree_new": bool(n["named_by_all_engines"])})

    # Domains: answers per domain on both dates.
    dom_a = {d["domain"]: d["answers"] for d in a["top_domains"]}
    dom_b = {d["domain"]: d["answers"] for d in b["top_domains"]}
    full_a = {}
    full_b = {}
    for d, rows in ((full_a, old_dir), (full_b, new_dir)):
        for r in csv.DictReader(open(os.path.join(rows, "cities.csv"))):
            for dom in filter(None, r["source_domains"].split("; ")):
                d[dom] = d.get(dom, 0) + 1
    doms = sorted(set(dom_a) | set(dom_b), key=lambda x: -(full_b.get(x, 0)))
    domains = [{"domain": d, "old": full_a.get(d, 0), "new": full_b.get(d, 0), "delta": full_b.get(d, 0) - full_a.get(d, 0)}
               for d in doms]

    def brand_answers(d):
        c = {}
        for r in csv.DictReader(open(os.path.join(d, "cities.csv"))):
            for n in set(filter(None, r["national_brands_named"].split("; "))):
                c[n] = c.get(n, 0) + 1
        return c

    nat_a, nat_b = brand_answers(old_dir), brand_answers(new_dir)
    top = {x["name"] for x in a["top_national"]} | {x["name"] for x in b["top_national"]}
    national = sorted(({"name": n, "old": nat_a.get(n, 0), "new": nat_b.get(n, 0), "delta": nat_b.get(n, 0) - nat_a.get(n, 0)}
                       for n in top), key=lambda x: (-x["new"], -x["old"]))

    out = {"experiment": "H03-E1", "old_date": da, "new_date": db, "overall": overall, "by_engine": by_engine,
           "retention": retention, "cities_top_same": top_same, "cities_agree_both": agree_both,
           "cities_compared": len(cities), "cities": cities, "domains": domains, "national": national}
    json.dump(out, open(os.path.join(new_dir, "change.json"), "w"), indent=1, ensure_ascii=False)
    print(json.dumps({"retention": retention, "top_same": top_same, "agree_both": agree_both}, indent=1))


if __name__ == "__main__":
    main()
