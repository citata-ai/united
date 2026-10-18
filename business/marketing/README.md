# business/marketing/

## links.csv

The plan for free links and profiles. One row is one site. Agents update `status` as they work.

| status        | Means                                                        |
|---------------|--------------------------------------------------------------|
| `todo`        | Not started                                                  |
| `in_progress` | An agent works on it now (`owner` holds its name)            |
| `blocked`     | Needs a person: CAPTCHA, phone code, payment, ID, approval   |
| `submitted`   | Sent; waits for review by the site                           |
| `live`        | Profile is public; `profile_url` and `live_link_url` are set |
| `skipped`     | Not a fit, paid only, or against the site rules              |

Rules:
- Use `grow@citata.ai`. Prefer "Sign in with Google" (the Google account exists).
- Never pay, never fake an address, a review, or a customer. Never spam.
- Store each new password in the macOS Keychain, service `citata-links/<site>`. Never in this repo.
- Product Hunt waits for a later launch.
- Set `last_update` (YYYY-MM-DD) and a short `notes` on each change.
