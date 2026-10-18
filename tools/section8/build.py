"""Build landing/src/data/fmr-fy2027.json from HUD Fair Market Rent files.

Stdlib only. Run from the repo root:

    python3 -I tools/section8/build.py            # download, then build
    python3 -I tools/section8/build.py --offline  # build from files already in --dir

Downloads go to --dir (default /tmp/citata-hud/). Treat them as untrusted data:
the script only reads them as zip/XML and never runs them.

What it does:
1. Downloads HUD FY2027 FMRs and revised FY2026 FMRs (county-level xlsx) from huduser.gov.
2. Groups rows by HUD area code (metro areas only), checks that each area has one FMR set.
3. Ranks metro FMR areas by population (HUD's own pop2024 column, summed over the area's
   counties or towns) and keeps the top 50.
4. Adds the FY2026 FMRs, the change in percent, the area's counties, the main local housing
   authority (tools/section8/pha.toml) and 3 nearby metros (by distance between main cities).
"""

import argparse
import datetime as dt
import json
import math
import re
import sys
import tomllib
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
OUT = ROOT / "landing" / "src" / "data" / "fmr-fy2027.json"

SOURCE_PAGE = "https://www.huduser.gov/portal/datasets/fmr.html"
FY27_URL = "https://www.huduser.gov/portal/datasets/fmr/fmr2027/FY27_FMRs.xlsx"
# Revised FY2026 FMRs (91 FR 21301, effective 2026-05-21): the FY2026 values in force
# until FY2027 took effect on 2026-10-01.
FY26_URL = "https://www.huduser.gov/portal/datasets/fmr/fmr2026/FY26_FMRs_revised.xlsx"
NOTICE = {
    "docket": "FR-6553-N-03",
    "citation": "91 FR 56156",
    "published": "2026-09-01",
    "effective": "2026-10-01",
    "url": "https://www.federalregister.gov/documents/2026/09/01/2026-17891/fair-market-rents-for-the-housing-choice-voucher-program-moderate-rehabilitation-single-room",
}
TOP_N = 50
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"

# Short name, URL slug, and main-city coordinates (only used to pick 3 nearby metros; not shown).
# Keys are HUD area codes. A top-50 area missing here fails the build, so a new HUD
# geography gets a human look.
AREAS = {
    "METRO35620MM5600": ("New York", "new-york", 40.71, -74.01),
    "METRO31080MM4480": ("Los Angeles", "los-angeles", 34.05, -118.24),
    "METRO16980M16980": ("Chicago", "chicago", 41.88, -87.63),
    "METRO26420M26420": ("Houston", "houston", 29.76, -95.37),
    "METRO37980M37980": ("Philadelphia", "philadelphia", 39.95, -75.17),
    "METRO47900M47900": ("Washington, DC", "washington-dc", 38.91, -77.04),
    "METRO12060M12060": ("Atlanta", "atlanta", 33.75, -84.39),
    "METRO19100M19100": ("Dallas", "dallas", 32.78, -96.80),
    "METRO38060M38060": ("Phoenix", "phoenix", 33.45, -112.07),
    "METRO40140M40140": ("Riverside-San Bernardino", "riverside-san-bernardino", 33.95, -117.40),
    "METRO19820M19820": ("Detroit", "detroit", 42.33, -83.05),
    "METRO33460M33460": ("Minneapolis-St. Paul", "minneapolis-st-paul", 44.98, -93.27),
    "METRO14460MM1120": ("Boston", "boston", 42.36, -71.06),
    "METRO45300M45300": ("Tampa", "tampa", 27.95, -82.46),
    "METRO41740M41740": ("San Diego", "san-diego", 32.72, -117.16),
    "METRO31080MM5945": ("Orange County, CA", "orange-county-ca", 33.75, -117.87),
    "METRO42660MM7600": ("Seattle", "seattle", 47.61, -122.33),
    "METRO19740M19740": ("Denver", "denver", 39.74, -104.99),
    "METRO35620MM5380": ("Nassau-Suffolk (Long Island)", "nassau-suffolk", 40.79, -73.13),
    "METRO12580M12580": ("Baltimore", "baltimore", 39.29, -76.61),
    "METRO41860MM5775": ("Oakland", "oakland", 37.80, -122.27),
    "METRO36740M36740": ("Orlando", "orlando", 28.54, -81.38),
    "METRO41180M41180": ("St. Louis", "st-louis", 38.63, -90.20),
    "METRO33100MM5000": ("Miami", "miami", 25.76, -80.19),
    "METRO19100MM2800": ("Fort Worth", "fort-worth", 32.76, -97.33),
    "METRO38900M38900": ("Portland, OR", "portland-or", 45.52, -122.68),
    "METRO41700M41700": ("San Antonio", "san-antonio", 29.42, -98.49),
    "METRO12420M12420": ("Austin", "austin", 30.27, -97.74),
    "METRO29820M29820": ("Las Vegas", "las-vegas", 36.17, -115.14),
    "METRO38300M38300": ("Pittsburgh", "pittsburgh", 40.44, -79.99),
    "METRO40900M40900": ("Sacramento", "sacramento", 38.58, -121.49),
    "METRO28140M28140": ("Kansas City", "kansas-city", 39.10, -94.58),
    "METRO17140M17140": ("Cincinnati", "cincinnati", 39.10, -84.51),
    "METRO16740M16740": ("Charlotte", "charlotte", 35.23, -80.84),
    "METRO35620MM5640": ("Newark", "newark", 40.74, -74.17),
    "METRO17410N17460": ("Cleveland", "cleveland", 41.50, -81.69),
    "METRO18140M18140": ("Columbus, OH", "columbus-oh", 39.96, -83.00),
    "METRO26900M26900": ("Indianapolis", "indianapolis", 39.77, -86.16),
    "METRO33100MM2680": ("Fort Lauderdale", "fort-lauderdale", 26.12, -80.14),
    "METRO41940M41940": ("San Jose", "san-jose", 37.34, -121.89),
    "METRO34980M34980": ("Nashville", "nashville", 36.16, -86.78),
    "METRO41860MM7360": ("San Francisco", "san-francisco", 37.77, -122.42),
    "METRO47260M47260": ("Virginia Beach-Norfolk", "virginia-beach-norfolk", 36.85, -76.29),
    "METRO27260M27260": ("Jacksonville", "jacksonville", 30.33, -81.66),
    "METRO41980MM7440": ("San Juan, PR", "san-juan-pr", 18.47, -66.11),
    "METRO33340M33340": ("Milwaukee", "milwaukee", 43.04, -87.91),
    "METRO33100MM8960": ("West Palm Beach", "west-palm-beach", 26.72, -80.05),
    "METRO39580M39580": ("Raleigh", "raleigh", 35.78, -78.64),
    "METRO35620MM0875": ("Bergen-Passaic, NJ", "bergen-passaic", 40.92, -74.17),
    "METRO36420M36420": ("Oklahoma City", "oklahoma-city", 35.47, -97.52),
}

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
REL_ID = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"


def download(url, dest):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=120) as r:
        if r.status != 200:
            sys.exit(f"download failed: {url} -> HTTP {r.status}")
        data = r.read()
    if not data.startswith(b"PK"):
        sys.exit(f"download is not an xlsx (zip): {url}")
    dest.write_bytes(data)
    print(f"downloaded {url} -> {dest} ({len(data)} bytes)")


def col_index(ref):
    n = 0
    for ch in re.match(r"[A-Z]+", ref).group(0):
        n = n * 26 + (ord(ch) - 64)
    return n - 1


def read_xlsx(path):
    """First sheet of an xlsx as a list of dicts keyed by the header row."""
    with zipfile.ZipFile(path) as z:
        shared = []
        if "xl/sharedStrings.xml" in z.namelist():
            for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si", NS):
                shared.append("".join(t.text or "" for t in si.iter(f"{{{NS['m']}}}t")))
        sheet_el = ET.fromstring(z.read("xl/workbook.xml")).find("m:sheets/m:sheet", NS)
        rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        target = next(r.get("Target") for r in rels if r.get("Id") == sheet_el.get(REL_ID))
        target = target.lstrip("/")
        target = target if target.startswith("xl/") else "xl/" + target
        sheet = ET.fromstring(z.read(target))
    rows = []
    for row in sheet.iter(f"{{{NS['m']}}}row"):
        cells = {}
        for c in row.findall("m:c", NS):
            v = c.find("m:v", NS)
            if c.get("t") == "s" and v is not None:
                val = shared[int(v.text)]
            elif c.get("t") == "inlineStr":
                val = "".join(x.text or "" for x in c.iter(f"{{{NS['m']}}}t"))
            else:
                val = v.text if v is not None else ""
            cells[col_index(c.get("r"))] = val.strip()
        if cells:
            rows.append([cells.get(i, "") for i in range(max(cells) + 1)])
    header = rows[0]
    return [dict(zip(header, r)) for r in rows[1:]]


def areas_from(rows, pop_col):
    """Group county/town rows into HUD metro FMR areas."""
    out = {}
    for r in rows:
        if r.get("metro") != "1":
            continue
        code = r["hud_area_code"]
        fmr = tuple(int(float(r[f"fmr_{i}"])) for i in range(5))
        a = out.setdefault(
            code,
            {
                "name": re.sub(r"\s+", " ", r["hud_area_name"]),
                "fmr": fmr,
                "pop": 0,
                "counties": defaultdict(int),
                "towns": False,
            },
        )
        if a["fmr"] != fmr:
            sys.exit(f"{code}: rows disagree on FMRs: {a['fmr']} vs {fmr}")
        pop = int(float(r[pop_col] or 0))
        a["pop"] += pop
        a["towns"] = a["towns"] or bool(r.get("county_town_name"))
        a["counties"][f"{r['countyname']}, {r['stusps']}"] += pop
    return out


def km(a, b):
    la1, lo1, la2, lo2 = map(math.radians, (a[2], a[3], b[2], b[3]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 12742 * math.asin(math.sqrt(h))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default="/tmp/citata-hud", help="download dir (untrusted data)")
    ap.add_argument("--offline", action="store_true", help="use files already in --dir")
    ap.add_argument("--out", default=str(OUT))
    args = ap.parse_args()

    d = Path(args.dir)
    d.mkdir(parents=True, exist_ok=True)
    f27, f26 = d / "FY27_FMRs.xlsx", d / "FY26_FMRs_revised.xlsx"
    if not args.offline:
        download(FY27_URL, f27)
        download(FY26_URL, f26)

    fy27 = areas_from(read_xlsx(f27), "pop2024")
    fy26 = areas_from(read_xlsx(f26), "pop2023")
    top = sorted(fy27.items(), key=lambda kv: -kv[1]["pop"])[:TOP_N]

    missing = [c for c, _ in top if c not in AREAS]
    if missing:
        sys.exit(f"add these HUD areas to AREAS: {[(c, fy27[c]['name']) for c in missing]}")

    pha_doc = tomllib.loads((HERE / "pha.toml").read_text())
    pha = pha_doc["pha"]

    metros = []
    for rank, (code, a) in enumerate(top, 1):
        short, slug, *_ = AREAS[code]
        prev = fy26.get(code)
        if prev is None:
            sys.exit(f"{code} ({a['name']}) has no FY2026 row; check HUD area changes")
        states = re.search(r",\s*([A-Z]{2}(?:-[A-Z]{2})*)", a["name"]).group(1).split("-")
        p = pha.get(code, {"name": "", "url": ""})
        metros.append(
            {
                "rank": rank,
                "slug": slug,
                "short": short,
                "hudName": a["name"],
                "hudAreaCode": code,
                "state": states[0],
                "states": states,
                "pop2024": a["pop"],
                "counties": [c for c, _ in sorted(a["counties"].items(), key=lambda kv: -kv[1])],
                # New England areas are made of towns: only part of each county may be in the area.
                "byTown": a["towns"],
                "fmr2027": list(a["fmr"]),
                "fmr2026": list(prev["fmr"]),
                "changePct": [round((n - o) / o * 100, 1) for n, o in zip(a["fmr"], prev["fmr"])],
                "pha": {"name": p["name"], "url": p["url"]},
            }
        )

    for m in metros:
        here = AREAS[m["hudAreaCode"]]
        others = sorted(
            (x for x in metros if x is not m), key=lambda x: km(here, AREAS[x["hudAreaCode"]])
        )
        m["nearby"] = [x["slug"] for x in others[:3]]

    data = {
        "dataset": "HUD Fair Market Rents FY2027 vs FY2026, top 50 metro FMR areas by population",
        "fetched": dt.date.today().isoformat(),
        "phaChecked": pha_doc["checked"],
        "sourcePage": SOURCE_PAGE,
        "fy2027Url": FY27_URL,
        "fy2026Url": FY26_URL,
        "notice": NOTICE,
        "rankBy": "Sum of the pop2024 column in HUD's FY2027 county-level FMR file",
        "metros": metros,
    }
    out = Path(args.out)
    out.write_text(json.dumps(data, indent=2) + "\n")
    print(f"wrote {out} ({len(metros)} metros)")


if __name__ == "__main__":
    main()
