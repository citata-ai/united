# business/

Business-as-Code for citata.ai. This folder is the source of truth for what the business is, what it wants and who it serves.

Now the data is TOML, so people and agents can read it. Later the scaffold (CTT-3) turns `model.toml` into Effect Schema and loads the other files through it.

| File               | Holds                                                    |
|--------------------|----------------------------------------------------------|
| `strategy.md`      | Why, what, for whom, how we win. Read first.             |
| `goals.toml`       | Objectives and key results, linked to TAO life goals     |
| `model.toml`       | Domain entities: Account, Project, Offer, Prompt, ...     |
| `accounts.toml`    | Our accounts and their projects                          |
| `offers.toml`      | What we sell and the price ladder                        |
| `competitors.toml` | The model business (FirstIndex) and agencies with proof   |
| `tools.toml`       | Delivery toolset, open source first                      |
| `finance.toml`     | Legal entity, payments, open money decisions             |

Rules:
- One fact lives in one file. Link, do not copy.
- A number without a source is a hypothesis. Mark it `status = "hypothesis"`.
- Dates are absolute (YYYY-MM-DD).
