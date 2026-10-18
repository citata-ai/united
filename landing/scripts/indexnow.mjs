// Ping IndexNow (Bing, Yandex, Seznam, Naver, Yep) with the URLs in the live sitemap.
// Run after a deploy that changed content: node scripts/indexnow.mjs [url ...]
// The key file public/9e602bed3f2049e6be68c4b2963608f8.txt proves we own the host. Google does not use IndexNow.
const host = "citata.ai";
const key = "9e602bed3f2049e6be68c4b2963608f8";

const urls = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      ...(await (await fetch(`https://${host}/sitemap.xml`)).text()).matchAll(
        /<loc>([^<]+)<\/loc>/g,
      ),
    ].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URLs`);
if (!res.ok && res.status !== 202) process.exit(1);
