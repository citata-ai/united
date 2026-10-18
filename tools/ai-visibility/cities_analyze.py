#!/usr/bin/env python3
"""H03-E1 analysis: who AI names as the best property manager in 50 US cities, and which sources it cites.

Reads answers.jsonl from a run of cities.toml and writes, in the same folder:
  summary.json   overall and per-city numbers (the research page reads it)
  cities.csv     one row per answer (the public download)

Usage: python3 -I tools/ai-visibility/cities_analyze.py business/marketing/ai-visibility/cities-2026-10/<date>
Stdlib only.
"""
import csv, json, os, re, sys, tomllib
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))

# National and multi-state brands (one office in several states or a franchise). Franchise offices ("Real Property Management Chicagoland")
# count as the brand. Patterns match the normalised name (lower case, "&" -> "and", no punctuation).
NATIONAL = {
    "Real Property Management": r"^real property management\b|^rpm (?!living)",
    "Mynd": r"^mynd\b",
    "Evernest": r"^evernest\b",
    "Greystar": r"^greystar\b",
    "Pinnacle Property Management Services": r"^pinnacle property management services\b",
    "HomeRiver Group": r"^homeriver\b|^home river group\b|^pure homeriver\b",
    "PURE Property Management": r"^pure property management\b",
    "Ziprent": r"^ziprent\b",
    "Utopia Management": r"^utopia management\b|^utopia property management\b",
    "All County Property Management": r"^all county\b",
    "On Q Property Management": r"^on q\b",
    "RealManage": r"^realmanage\b",
    "Bay Property Management Group": r"^bay property management group\b",
    "Berkshire Hathaway HomeServices": r"^berkshire hathaway\b",
    "Keyrenter": r"^keyrenter\b",
    "PMI (Property Management Inc.)": r"^pmi\b|^property management inc\b",
    "Renters Warehouse": r"^renters warehouse\b",
    "Home365": r"^home ?365\b",
    "Belong": r"^belong\b",
    "Doorstead": r"^doorstead\b",
    "Roofstock": r"^roofstock\b",
    "Invitation Homes": r"^invitation homes\b",
    "Main Street Renewal": r"^main street renewal\b",
    "Asset Living": r"^asset living\b",
    "RPM Living": r"^rpm living\b",
    "Avenue5 Residential": r"^avenue ?5\b",
    "Lincoln Property Company": r"^lincoln property\b",
    "FirstService Residential": r"^firstservice residential\b|^first service residential\b",
    "Associa": r"^associa\b",
    "Bozzuto": r"^bozzuto\b",
    "Cushman and Wakefield": r"^cushman\b",
    "CBRE": r"^cbre\b",
    "JLL": r"^jll\b|^jones lang lasalle\b",
    "Bell Partners": r"^bell partners\b",
    "Mill Creek Residential": r"^mill creek residential\b",
    "Cortland": r"^cortland\b",
    "Bridge Property Management": r"^bridge property management\b",
    "Waypoint Homes": r"^waypoint\b",
    "Grace Property Management": r"^grace property management\b",
}
NATIONAL_RE = {k: re.compile(v) for k, v in NATIONAL.items()}

# Source types. Anything else that looks like a manager's own site counts as "company site".
SOURCE_TYPE = {
    "directory": ["yelp.com", "expertise.com", "thumbtack.com", "angi.com", "angieslist.com", "homeadvisor.com",
                  "bbb.org", "threebestrated.com", "ipropertymanagement.com", "clutch.co", "nextdoor.com",
                  "manageproperty.com", "allpropertymanagement.com", "porch.com", "bestinhood.com", "local.yahoo.com",
                  "propertymanagement.com", "upnest.com", "mapquest.com", "yellowpages.com", "birdeye.com",
                  "trustpilot.com", "google.com", "maps.google.com", "apartments.com", "zillow.com", "rentometer.com",
                  "bestprosintown.com", "chamberofcommerce.com", "manta.com", "superpages.com", "houzz.com",
                  "realtor.com", "redfin.com", "trulia.com", "hotpads.com", "rent.com", "apartmentratings.com",
                  "glassdoor.com", "indeed.com", "linkedin.com", "facebook.com", "instagram.com", "x.com",
                  "twitter.com", "youtube.com", "ratemyagent.com", "homelight.com", "fastexpert.com",
                  "propertymanagerguide.com", "best-pm.com", "rentprep.com", "rentecdirect.com", "turbotenant.com",
                  "doorloop.com", "steadily.com", "buildium.com", "appfolio.com", "rentvine.com", "bestcompaniesaz.com",
                  "trustanalytica.org", "keyverified.com", "flatfeelandlord.com", "hoaunlimited.com", "americatop10.com",
                  "homeguide.com", "propertymanagementlist.com", "verifiedmanagers.com", "housecashin.com",
                  "stessa.com"],
    "forum": ["reddit.com", "biggerpockets.com", "quora.com", "city-data.com", "tripadvisor.com"],
    "association": ["narpm.org", "irem.org", "naahq.org", "caiaustin.org"],
    "data": ["inven.ai", "revenuebase.ai", "anyleads.com", "seolium.com", "aeroleads.com", "comparespot.org"],
    "company": ["mynd.co", "belonghome.com", "home365.co", "awning.com", "redawning.com", "northpointam.com",
                "peterlohmann.com", "homeriver.com", "purehomeriver.com", "rentalsamerica.com"],
    "media": ["nbcnews.com", "therealdeal.com", "citywatchla.com", "azbigmedia.com", "nyc.gov", "popville.com",
              "indyexaminer.com", "okcexaminer.com", "alamoexaminer.com", "thephoenixreview.com",
              "theripcityreview.com", "jacksonvilletribune.co", "uncoverdenver.com", "nashvilleexplored.com",
              "remny.com"],
    "reference": ["wikipedia.org", "en.wikipedia.org", "forbes.com", "usnews.com", "bizjournals.com", "inc.com",
                  "sfist.com", "columbusuncovered.com"],
}
# Platforms we report as "listing / review site" in the page (subset of directory).
LISTING = {"yelp.com", "expertise.com", "thumbtack.com", "angi.com", "homeadvisor.com", "bbb.org", "threebestrated.com",
           "ipropertymanagement.com", "clutch.co", "nextdoor.com", "manageproperty.com", "allpropertymanagement.com",
           "porch.com", "bestinhood.com", "local.yahoo.com", "upnest.com", "mapquest.com", "yellowpages.com",
           "birdeye.com", "trustpilot.com", "google.com", "bestprosintown.com", "fastexpert.com", "propertymanagement.com",
           "reviews.birdeye.com", "trustanalytica.org", "keyverified.com", "flatfeelandlord.com", "americatop10.com",
           "homeguide.com", "propertymanagementlist.com", "verifiedmanagers.com", "housecashin.com", "hoaunlimited.com"}
PM_WORDS = re.compile(r"propert|manag|realty|rent|leas|homes|pm|estate|residential|invest|apartment|housing|living")


def norm(name):
    s = name.lower().replace("&", " and ").replace("’", "'")
    s = re.sub(r"\([^)]*\)", " ", s)
    s = re.sub(r"[^a-z0-9' ]+", " ", s).replace("'", "")
    s = re.sub(r"\b(llc|inc|co|corp|ltd|pllc|the)\b", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def brand(name):
    n = norm(name)
    for k, r in NATIONAL_RE.items():
        if r.search(n):
            return k
    return None


def compact(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


def stem(dom):
    """Second-level label: 'gcrealtyinc' for gcrealtyinc.com, 'kassmanagement' for chicago.kassmanagement.com."""
    parts = dom.split(".")
    return parts[-2] if len(parts) >= 2 else dom


def source_type(dom, companies):
    for t, doms in SOURCE_TYPE.items():
        if any(dom == d or dom.endswith("." + d) for d in doms):
            return t
    if "narpm" in dom:
        return "association"
    st = stem(dom)
    for c in companies:
        cc = compact(norm(c))
        first = compact(norm(c).split(" ")[0]) if norm(c) else ""
        if len(st) >= 4 and (st in cc or cc[:len(st)] == st or (len(first) >= 4 and st.startswith(first))):
            return "company"
    if re.fullmatch(r"[a-z0-9-]+\.[a-z.]+", dom) and PM_WORDS.search(st):
        return "company"
    return "other"


DOMAIN_TYPE = {}


def text_domains(answer):
    return {re.sub(r"^www\.", "", m.lower()) for m in re.findall(r"https?://([^/\s)\]>\"']+)", answer)}


def main():
    out = sys.argv[1]
    cfg = tomllib.load(open(os.path.join(HERE, "cities.toml"), "rb"))
    meta = {p["id"]: p for p in cfg["prompt"]}
    rows = [json.loads(l) for l in open(os.path.join(out, "answers.jsonl"))]
    ok = [r for r in rows if not r["error"] and r["answer"].strip()]
    failed = [{"prompt_id": r["prompt_id"], "engine": r["engine"], "error": r["error"][:200]} for r in rows if r not in ok]

    recs = []
    for r in ok:
        comps = list(dict.fromkeys(c for c in r["companies"] if c.strip()))
        brands = [brand(c) for c in comps]
        doms = sorted(set(d for d in r["cited_domains"] if d) | text_domains(r["answer"]))
        types = {d: source_type(d, comps) for d in doms}
        for d, t in types.items():
            if t == "company" or d not in DOMAIN_TYPE:
                DOMAIN_TYPE[d] = t
        recs.append({**r, "city": meta[r["prompt_id"]]["city"], "state": meta[r["prompt_id"]]["state"],
                     "rank_pop": meta[r["prompt_id"]]["rank"], "companies": comps, "brands": brands,
                     "national": [b for b in brands if b], "local": [c for c, b in zip(comps, brands) if not b],
                     "domains": doms, "types": types})

    for r in recs:
        r["types"] = {d: DOMAIN_TYPE[d] for d in r["domains"]}

    def share(n, d):
        return round(100 * n / d, 1) if d else 0.0

    def agg(rr):
        n = len(rr)
        return {
            "answers": n,
            "avg_companies": round(sum(len(r["companies"]) for r in rr) / n, 1) if n else 0,
            "answers_with_national": sum(bool(r["national"]) for r in rr),
            "pct_with_national": share(sum(bool(r["national"]) for r in rr), n),
            "national_names": sum(len(r["national"]) for r in rr),
            "local_names": sum(len(r["local"]) for r in rr),
            "pct_names_local": share(sum(len(r["local"]) for r in rr), sum(len(r["companies"]) for r in rr)),
            "answers_with_any_source": sum(bool(r["domains"]) for r in rr),
            "pct_with_any_source": share(sum(bool(r["domains"]) for r in rr), n),
            "answers_with_company_site": sum("company" in r["types"].values() for r in rr),
            "pct_with_company_site": share(sum("company" in r["types"].values() for r in rr), n),
            "answers_with_listing_site": sum(any(d in LISTING for d in r["domains"]) for r in rr),
            "pct_with_listing_site": share(sum(any(d in LISTING for d in r["domains"]) for r in rr), n),
            "answers_with_forum": sum("forum" in r["types"].values() for r in rr),
            "pct_with_forum": share(sum("forum" in r["types"].values() for r in rr), n),
            "avg_sources": round(sum(len(r["domains"]) for r in rr) / n, 1) if n else 0,
        }

    # Companies: national brands merge their offices; local firms by normalised name and city.
    shown = {}

    def key(r, c, b):
        if b:
            return b
        k = (compact(norm(c)), r["city"], r["state"])
        shown.setdefault(k, f"{c} ({r['city']}, {r['state']})")
        return shown[k]

    comp_answers, comp_cities = Counter(), defaultdict(set)
    for r in recs:
        for k in {key(r, c, b) for c, b in zip(r["companies"], r["brands"])}:
            comp_answers[k] += 1
            comp_cities[k].add(r["city"])
    dom_answers = Counter(d for r in recs for d in r["domains"])
    dom_type = DOMAIN_TYPE
    type_answers = Counter(t for r in recs for t in set(r["types"].values()))
    company_site_total = sum(1 for d, t in dom_type.items() if t == "company")

    engines = sorted({r["engine"] for r in recs})
    by_engine = {}
    for e in engines:
        rr = [r for r in recs if r["engine"] == e]
        by_engine[e] = {**agg(rr), "model": rr[0]["model"],
                        "top_domains": [{"domain": d, "answers": n} for d, n in Counter(d for r in rr for d in r["domains"]).most_common(10)]}

    cities = []
    for pid in sorted(meta, key=lambda p: meta[p]["rank"]):
        rr = [r for r in recs if r["prompt_id"] == pid]
        m = meta[pid]
        cnt, first = Counter(), {}
        for r in rr:
            seen = set()
            for i, (c, b) in enumerate(zip(r["companies"], r["brands"])):
                kk = b or compact(norm(c))
                if kk in seen:  # one answer counts once, even if it names 2 offices of a brand
                    continue
                seen.add(kk)
                cnt[kk] += 1
                first.setdefault(kk, (b or c, i))
                first[kk] = (first[kk][0], min(first[kk][1], i))
        top = sorted(cnt, key=lambda k: (-cnt[k], first[k][1]))[:5]
        cities.append({
            "rank": m["rank"], "city": m["city"], "state": m["state"], **agg(rr),
            "engines_ok": sorted(r["engine"] for r in rr),
            "top_companies": [{"name": first[k][0], "answers": cnt[k], "national": first[k][0] in NATIONAL} for k in top],
            "named_by_all_engines": [first[k][0] for k in cnt if cnt[k] >= 3 and len(rr) >= 3],
            "national_brands": sorted({b for r in rr for b in r["national"]}),
            "top_domains": [d for d, _ in Counter(d for r in rr for d in r["domains"]).most_common(6)],
        })

    overall = agg(recs)
    overall.update({
        "answers_total": len(rows), "answers_failed": len(failed), "cities": len(meta), "engines": engines,
        "dates": sorted({r["date"] for r in rows}), "prompt": "What is the best property management company in <City, ST>? Give names.",
        "distinct_companies": len(comp_answers),
        "distinct_local_companies": sum(1 for k in comp_answers if k not in NATIONAL),
        "distinct_domains": len(dom_answers),
        "distinct_company_site_domains": company_site_total,
        "cities_with_national": sum(1 for c in cities if c["national_brands"]),
        "cities_with_full_agreement": sum(1 for c in cities if c["named_by_all_engines"]),
        "citata_mentioned": sum(r["mentioned"] for r in recs),
        "fridman_mentioned": sum(bool(re.search(r"fridman", r["answer"], re.I)) for r in recs),
        "source_type_answers": dict(type_answers),
    })
    summary = {
        "experiment": "H03-E1", "overall": overall, "by_engine": by_engine,
        "top_companies": [{"name": k, "answers": n, "cities": len(comp_cities[k]), "national": k in NATIONAL}
                          for k, n in comp_answers.most_common(20)],
        "top_national": [{"name": k, "answers": n, "cities": len(comp_cities[k])}
                         for k, n in comp_answers.most_common() if k in NATIONAL][:15],
        "top_domains": [{"domain": d, "answers": n, "type": dom_type[d]} for d, n in dom_answers.most_common(20)],
        "top_listing_domains": [{"domain": d, "answers": n} for d, n in dom_answers.most_common() if d in LISTING][:15],
        "cities": cities, "failed": failed,
    }
    json.dump(summary, open(os.path.join(out, "summary.json"), "w"), indent=1, ensure_ascii=False)

    with open(os.path.join(out, "cities.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["date", "city", "state", "pop_rank", "engine", "model", "n_companies", "companies_in_order",
                    "national_brands_named", "n_sources", "source_domains", "links_company_site", "links_listing_site"])
        for r in sorted(recs, key=lambda r: (r["rank_pop"], r["engine"])):
            w.writerow([r["date"], r["city"], r["state"], r["rank_pop"], r["engine"], r["model"], len(r["companies"]),
                        "; ".join(r["companies"]), "; ".join(dict.fromkeys(r["national"])), len(r["domains"]),
                        "; ".join(r["domains"]), "company" in r["types"].values(), any(d in LISTING for d in r["domains"])])
    print(json.dumps({k: overall[k] for k in ("answers", "answers_failed", "pct_with_national", "pct_names_local",
                                               "pct_with_any_source", "pct_with_company_site", "pct_with_listing_site")}))


if __name__ == "__main__":
    main()
