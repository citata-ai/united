import json, html, sys
C="https://d24ovhgu8s7341.cloudfront.net/uploads/post/cover/"
P=[ # (cover, kicker, title, dek, author, date)
("4521/a8d4269170b8f86b-Cover_static.jpg","Chain of Thought","How Codex Happened","The inside story of a tool that changed how a whole team ships.","Dan Shipper","Oct 15, 2026"),
("4520/90650b3ca9a3040a-image__2_.jpg","Context Window","The Best Founders Have Something AI Can’t Tell Them","","Laura Entis","Oct 14, 2026"),
("4522/819523d4bbe1e97f-cover.jpg","Also True for Humans","Context Engineering Is Knowing When to Start Over","Old instructions and earlier mistakes can derail your AI chats. Here’s how to reset without losing useful work.","Mike Taylor","Oct 16, 2026"),
("4518/be0b70b6b01f888c-Cover_gemini_2.jpg","Vibe Check","Gemini 4 Argon Puts Google Back On the Frontier","","Katie Parrott","Oct 13, 2026"),
("4517/0130b8ee1c1a7787-agent_CW-1.jpg","Essay","One Agent for the Whole Company","","Every Staff","Oct 12, 2026"),
("4516/ee370af113b78625-simulation2.jpg","Essay","You Already Signed This Off (In the Simulation)","","Mike Taylor","Oct 11, 2026"),
("4515/ad9fc515e8893ff1-1Claude_managed_agents.jpg","Essay","Why We Handed Our Agent’s Infrastructure to Anthropic","","Paridhi Agarwal","Oct 10, 2026"),
("4491/9276f2fe77438064-compare.jpg","Vibe Check","GPT-6 Sol vs. Opus 5.5","Two models, one clear tradeoff","Dan Shipper","Oct 9, 2026"),
("4486/8a9d458b75d64a9b-afterimage-astra-vfx-vc.jpg","Vibe Check","Is Astra a Breakthrough for Indie Filmmakers?","A professional creative studio puts GPT-6 to the test","Cyrus Duff","Oct 8, 2026"),
("4478/62bd152a2d65f74e-image.jpg","Mini-Vibe Check","TypeSafe's Jev Judged Everything I’ve Written in 0.7 Seconds","Its new model turns fuzzy questions into probabilities fast and cheaply enough to check an AI agent’s work as it goes","Mike Taylor","Oct 7, 2026"),
("4508/37a4947bdd639343-learn_ai3.jpg","Training","How to Get Better at AI by Asking AI","Five prompts that took me from one-off chats to delegating whole projects to teams of agents","Arielle Shipper","Oct 6, 2026"),
("4488/5518cf5c6bcf4ed2-cover.jpg","Training","How to Create Your Own Personal AI Benchmark","Choose the best model for the work you do","Mike Taylor","Oct 5, 2026"),
("4405/bc98c2f877e98170-risk.jpg","Training","I Vibe Coded a Security Risk","The app worked. Nobody, including me, had checked whether it was safe.","Katie Parrott","Oct 4, 2026"),
("4397/f82cd84919912eb7-1microsoft.jpg","Training","The Best AI Agent Builder Is Trapped Inside Microsoft","You just have to survive the onboarding, the 404s, and 80 things called Copilot to find it","Mike Taylor","Oct 3, 2026"),
("4492/9211af158997cb4e-feather_belief.jpg","Writing","Good Writing With AI Starts Before the Prompt","A look inside Mike Taylor’s writing workflow—and the work he still does himself","Mike Taylor","Oct 2, 2026"),
("4471/427b1da9dfd4a053-323.jpg","Writing","What Writers Who Use AI Want You to Know","Five professional writers share how they use AI, where it disappoints them, and what they still insist on doing themselves","Laura Entis","Oct 1, 2026"),
("4450/1d3cfded5c5754ed-stochastic_parrot.jpg","Writing","I Tried the AI Model Built to Fix AI Writing","A new lab says the sameness of AI prose is a training problem.","Katie Parrott","Sep 30, 2026"),
("4192/a10cbabf60c56389-Socrates-as-a-Service.png","Writing","Socrates as a Service","The best stories live in people—and getting them out is still a human job","Eleanor Warnock","Sep 29, 2026"),
("4514/656b5026ebac43c0-Cover_Agent2.jpg","Podcast · Ep. 110","Building a More Efficient Agent","Why Every traded personal agents for a shared company agent","Dan Shipper","Sep 28, 2026"),
("4506/1e538049bfedeca3-Cover_SAM2.jpg","Podcast · Ep. 109","How Sam Altman Uses Bots to Take Back His Time","Why he believes AI will spark a new Renaissance","Dan Shipper","Sep 27, 2026"),
]
e=html.escape
def ini(a): return "".join(w[0] for w in a.split()[:2])
def card(p, cls="card", dek=True):
    c,k,t,d,a,dt=p
    return f'''<a class="{cls}" href="#"><div class="img"><img src="{C}{c}" alt=""></div><div class="body"><div class="meta"><span class="kick">{e(k)}</span><span>{dt}</span></div><h3>{e(t)}</h3>{f'<p class="dek">{e(d)}</p>' if dek and d else ''}<div class="by"><span class="av">{ini(a)}</span>{e(a)}</div></div></a>'''
feat=P[0]; top=P[1:3]; recent=P[3:7]; vibe=P[7:10]; train=P[10:14]; writing=P[14:18]; pod=P[18:20]
page=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Citata — blog test (every.to structure, Cal Sans)</title>
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<style>
/* Local test only. Cover images are hotlinked from every.to and belong to Every. Never ship them. */
@font-face{{font-family:"Cal Sans";src:url(../fonts/CalSansVF.woff2) format("woff2");font-weight:100 900}}
@font-face{{font-family:"Paper Mono";src:url(../fonts/PaperMono-Regular.woff2) format("woff2")}}
:root{{--parchment:#F5EFE3;--page:#FBF7EE;--sunken:#ECE3D2;--ink:#1C1712;--ink-2:#5C5145;--rule:#D9CDB6;--rule-2:#B8A88C;--lapis:#1E3A7B;--gold:#B8892B;--gold-ink:#7A5A14;--minium:#C2410C;--font:"Cal Sans",system-ui,sans-serif}}
*{{box-sizing:border-box}}html{{background:var(--parchment);color:var(--ink)}}
body{{margin:0;font-family:var(--font);font-size:16px;line-height:1.5}}
a{{color:inherit;text-decoration:none}}
.wrap{{max-width:1280px;margin:0 auto;padding:0 32px}}
nav{{display:flex;align-items:center;justify-content:space-between;padding:18px 0;border-bottom:1px solid var(--rule)}}
nav img{{height:36px;display:block}}nav ul{{display:flex;gap:26px;list-style:none;margin:0;padding:0;font-size:15px;color:var(--ink-2)}}
.btn{{display:inline-block;font-size:14px;font-weight:500;padding:10px 16px;border-radius:4px;background:var(--lapis);color:var(--page)}}
.label{{font-family:"Paper Mono",monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2);display:flex;align-items:center;gap:10px;margin:0 0 18px}}
.label::before{{content:"";width:8px;height:8px;background:var(--minium);border-radius:2px}}
.img{{aspect-ratio:16/9;overflow:hidden;border-radius:4px;background:var(--sunken)}}.img img{{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s}}
a:hover .img img{{transform:scale(1.03)}}
.meta{{display:flex;gap:10px;font-family:"Paper Mono",monospace;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-2);margin:12px 0 6px}}
.kick{{color:var(--minium)}}
h3{{font-weight:500;font-size:20px;line-height:1.2;margin:0 0 6px;letter-spacing:0}}
.dek{{color:var(--ink-2);margin:0 0 10px;font-size:15px;line-height:1.45}}
.by{{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-2)}}
.av{{width:24px;height:24px;border-radius:50%;background:var(--minium);color:var(--page);font-size:10px;display:inline-flex;align-items:center;justify-content:center}}
.hero{{display:grid;grid-template-columns:1.6fr 1fr;gap:32px;padding:40px 0 56px;border-bottom:1px solid var(--rule)}}
.feat h2{{font-weight:600;font-size:clamp(34px,4.2vw,56px);line-height:1.02;margin:16px 0 12px}}
.feat .dek{{font-size:19px}}
.side{{display:flex;flex-direction:column;gap:24px}}
.side .card{{display:grid;grid-template-columns:1fr;}}
section{{padding:56px 0;border-bottom:1px solid var(--rule)}}
.g4{{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}}.g3{{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}}
.band{{background:var(--ink);color:var(--parchment);border-radius:6px;padding:40px;margin:56px 0}}
.band .label,.band .meta,.band .dek,.band .by{{color:#A89B88}}.band .kick{{color:#F08A4B}}
.band-head{{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:28px}}
.band-head h2{{font-weight:600;font-size:40px;line-height:1;margin:0}}.band-head p{{max-width:420px;margin:0;color:#A89B88}}
.col-head{{display:flex;justify-content:space-between;align-items:end;margin-bottom:24px}}.col-head h2{{font-weight:600;font-size:32px;margin:0;line-height:1.1}}
.col-head a{{font-size:14px;color:var(--minium)}}
.list .row{{display:grid;grid-template-columns:240px 1fr;gap:24px;padding:18px 0;border-top:1px solid var(--rule)}}
.list .row .meta{{margin-top:0}}
.stamps{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}}
.stamp{{background:var(--page);border:1px solid var(--rule);border-radius:6px;padding:28px;display:flex;gap:18px;align-items:flex-start}}
.stamp .ic{{flex:none;width:64px;height:64px;border-radius:14px;background:var(--minium);display:flex;align-items:center;justify-content:center}}
.stamp .ic img{{width:64px;height:64px}}
.stamp h3{{font-size:22px}}.stamp p{{margin:0;color:var(--ink-2);font-size:15px}}
.pods{{display:grid;grid-template-columns:1fr 1fr;gap:28px}}.pods .card{{display:grid;grid-template-columns:200px 1fr;gap:20px}}.pods .meta{{margin-top:0}}
.sub{{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center;padding:64px 0}}
.sub h2{{font-weight:600;font-size:44px;line-height:1.05;margin:0}}
.sub form{{display:flex;gap:8px}}.sub input{{flex:1;font:inherit;padding:12px 14px;border:1px solid var(--rule-2);border-radius:4px;background:var(--page)}}
footer{{padding:32px 0 60px;display:flex;justify-content:space-between;color:var(--ink-2);font-size:13px;border-top:1px solid var(--rule)}}
@media(max-width:900px){{.hero,.g4,.g3,.stamps,.pods,.sub{{grid-template-columns:1fr}}.list .row,.pods .card{{grid-template-columns:120px 1fr}}nav ul{{display:none}}.band{{padding:24px}}}}
</style></head><body><div class="wrap">
<nav><a href="#"><img src="../wordmark.svg" alt="Citata"></a><ul><li>Ideas</li><li>Case studies</li><li>Training</li><li>Tools</li><li>Pricing</li></ul><a class="btn" href="#">Free AI audit</a></nav>
<div class="hero">
 <a class="feat" href="#"><div class="img"><img src="{C}{feat[0]}" alt=""></div><div class="meta"><span class="kick">{feat[1]}</span><span>{feat[5]}</span></div><h2>{e(feat[2])}</h2><p class="dek">{e(feat[3])}</p><div class="by"><span class="av">{ini(feat[4])}</span>{feat[4]}</div></a>
 <div class="side"><p class="label">Top stories</p>{"".join(card(p) for p in top)}</div>
</div>
<section><p class="label">Recent essays</p><div class="g4">{"".join(card(p,dek=False) for p in recent)}</div></section>
<div class="band"><div class="band-head"><div><p class="label">Column</p><h2>Vibe Check</h2></div><p>We test new AI models on real client work, then say which one wins and why.</p></div><div class="g3">{"".join(card(p) for p in vibe)}</div></div>
<section><div class="col-head"><h2>Built by Citata</h2><a href="#">All tools →</a></div><div class="stamps">
 <div class="stamp"><div class="ic"><img src="../icon.svg" alt=""></div><div><h3>AI Visibility Audit</h3><p>20 prompts × 4 engines. See where AI cites you and where it does not.</p></div></div>
 <div class="stamp"><div class="ic"><img src="icon-lapis.svg" alt=""></div><div><h3>Citation Tracker</h3><p>The same prompts every week. One chart for ChatGPT, Gemini, Claude, Perplexity.</p></div></div>
 <div class="stamp"><div class="ic"><img src="icon-gold.svg" alt=""></div><div><h3>Monday Report</h3><p>One change a day, checked by a person. One report every Monday.</p></div></div>
</div></section>
<section><div class="col-head"><h2>Training</h2><a href="#">See all →</a></div><div class="g4">{"".join(card(p) for p in train)}</div></section>
<section><div class="col-head"><h2>The New Rules of Writing</h2><a href="#">See all →</a></div><div class="list">{"".join(f'<a class="row" href="#"><div class="img"><img src="{C}{p[0]}" alt=""></div><div><div class="meta"><span class="kick">{p[1]}</span><span>{p[5]}</span></div><h3 style="font-size:24px">{e(p[2])}</h3><p class="dek">{e(p[3])}</p><div class="by"><span class="av">{ini(p[4])}</span>{p[4]}</div></div></a>' for p in writing)}</div></section>
<section><div class="col-head"><h2>Podcast</h2><a href="#">All episodes →</a></div><div class="pods">{"".join(card(p) for p in pod)}</div></section>
<div class="sub"><h2>Get cited.<br><span style="color:var(--minium)">Every Monday</span>, in your inbox.</h2><form onsubmit="return false"><input placeholder="you@company.com"><button class="btn" style="border:0;font:inherit">Subscribe</button></form></div>
<footer><span>Citata · Aetas aurea redit</span><span>Blog test · cover images © Every, local test only</span></footer>
</div></body></html>'''
open(sys.argv[1],'w').write(page); print("ok")
