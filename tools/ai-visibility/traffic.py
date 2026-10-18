#!/usr/bin/env python3
"""AI traffic on citata.ai from Analytics Engine: AI crawlers and AI referrals.

Usage: python3 tools/ai-visibility/traffic.py [--days 7]

Token: env CF_ANALYTICS_TOKEN, else macOS Keychain service "citata/CF_ANALYTICS_TOKEN"
(Cloudflare token "citata-ai-traffic-read", Account Analytics Read, expires 2027-10-18).
Only HTTP 200 rows count: bots that probe /.env and other missing files are scanners
with a fake user agent, not AI crawlers. See docs/ai-traffic.md.
"""
import argparse, json, os, subprocess, urllib.request

ACCOUNT = "1494c6f692bcb718f1c942d6801e83fe"


def token():
    t = os.environ.get("CF_ANALYTICS_TOKEN")
    if t:
        return t
    return subprocess.run(["security", "find-generic-password", "-s", "citata/CF_ANALYTICS_TOKEN", "-w"],
                          capture_output=True, text=True, check=True).stdout.strip()


def sql(q):
    req = urllib.request.Request(f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}/analytics_engine/sql",
                                 data=q.encode(), headers={"Authorization": "Bearer " + token()})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read())["data"]


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--days", type=int, default=7)
    days = a.parse_args().days
    where = f"timestamp > NOW() - INTERVAL '{days}' DAY AND double2 = 200"
    rows = sql(f"SELECT blob1 AS kind, blob2 AS source, SUM(_sample_interval * double1) AS hits FROM citata_ai_traffic "
               f"WHERE {where} GROUP BY kind, source ORDER BY hits DESC FORMAT JSON")
    pages = sql(f"SELECT blob1 AS kind, blob4 AS path, SUM(_sample_interval * double1) AS hits FROM citata_ai_traffic "
                f"WHERE {where} GROUP BY kind, path ORDER BY hits DESC LIMIT 15 FORMAT JSON")
    print(f"## AI traffic, last {days} days (HTTP 200 only)\n")
    print("| Kind | Source | Hits |\n| --- | --- | --- |")
    for r in rows:
        print(f"| {r['kind']} | {r['source']} | {int(r['hits'])} |")
    print("\n| Kind | Path | Hits |\n| --- | --- | --- |")
    for r in pages:
        print(f"| {r['kind']} | {r['path']} | {int(r['hits'])} |")


if __name__ == "__main__":
    main()
