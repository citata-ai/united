# AI traffic on citata.ai

Status: v1, 2026-10-18.

We measure three things. The Ahrefs AEO guide uses the same three.

| What                         | Tool                                                    | Where to read it                          |
|------------------------------|---------------------------------------------------------|-------------------------------------------|
| People who come from AI      | Worker `landing/ai-traffic.js` + Ahrefs Web Analytics   | Workers Logs, Analytics Engine, Ahrefs    |
| AI crawlers that read pages  | Worker `landing/ai-traffic.js`                          | Workers Logs, Analytics Engine            |
| What the buyer says          | "How did you hear about us" line in the audit email     | Inbox `grow@citata.ai`                    |

AI referral numbers are low counts. ChatGPT drops the referrer on some links. Google AI Overviews and AI Mode show as `google.com`. Use the numbers for trends, not as exact totals.

## Worker

`landing/worker.js` calls `classify()` for each page request (not fonts, images or CSS). An AI hit goes to:

- **Workers Logs**: one JSON line, `event = "ai_traffic"`. Dashboard → Workers → `citata-landing` → Logs. Free plan keeps 3 days.
- **Analytics Engine** dataset `citata_ai_traffic` (keeps 3 months).

Analytics Engine columns:

| Column    | Value                                                        |
|-----------|--------------------------------------------------------------|
| `index1`  | `bot` or `referral`                                          |
| `blob1`   | `bot` or `referral`                                          |
| `blob2`   | source: `openai`, `anthropic`, `chatgpt`, `perplexity`, ...  |
| `blob3`   | user-agent token (bots), or `referer` / `utm` (referrals)    |
| `blob4`   | path                                                         |
| `blob5`   | country                                                      |
| `blob6`   | full Referer header                                          |
| `double1` | 1 (count)                                                    |
| `double2` | HTTP status                                                  |

Query (needs a Cloudflare API token with Account Analytics Read):

```sh
curl -s "https://api.cloudflare.com/client/v4/accounts/1494c6f692bcb718f1c942d6801e83fe/analytics_engine/sql" \
  -H "Authorization: Bearer $CF_ANALYTICS_TOKEN" \
  --data "SELECT blob1 AS kind, blob2 AS source, blob4 AS path, SUM(_sample_interval * double1) AS hits
          FROM citata_ai_traffic WHERE timestamp > NOW() - INTERVAL '7' DAY
          GROUP BY kind, source, path ORDER BY hits DESC FORMAT JSON"
```

A bot that reads a page again and again is a sign that AI uses the page as a source.

## Ahrefs Web Analytics

Script in `landing/src/layouts/Base.astro`, key `ZBFZfEWCf4yVC1R7LkUI3w`, project "Citata" in the Ahrefs workspace. No cookies. It has an AI channel out of the box. The `ahrefs-site-verification` meta tag in the same file proves we own the site; it opens Site Audit for free.
