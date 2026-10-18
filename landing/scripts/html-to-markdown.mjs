// Small HTML → Markdown converter for our own Astro pages (no dependencies).
// Covers what the pages use: headings, paragraphs, lists, links, bold, tables.

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

/** @param {string} s */
export function decodeEntities(s) {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const n = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isNaN(n) ? m : String.fromCodePoint(n);
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

/**
 * @param {string} html full page or fragment; only <main> is converted when present
 * @param {string} base absolute origin for root-relative links
 */
export function htmlToMarkdown(html, base) {
  let s = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html;
  s = s
    .replace(/\s+/g, " ") // HTML whitespace carries no meaning; structure comes from tags
    .replace(/<\/?(thead|tbody)[^>]*>/gi, "")
    .replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/gi, "")
    .replace(/<img[^>]*>/gi, "")
    .replace(/<a [^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
      const t = text.replace(/<[^>]+>/g, "").trim();
      if (!t) return "";
      const url = href.startsWith("/") ? base + href : href;
      return url.startsWith("mailto:") || url.startsWith("http") ? `[${t}](${url})` : t;
    })
    .replace(/<\/?(strong|b)>/gi, "**")
    .replace(/<h([1-6])[^>]*>/gi, (_, n) => `\n\n${"#".repeat(Number(n))} `)
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<tr[^>]*>/gi, "\n|")
    .replace(/<t[hd][^>]*>/gi, " ")
    .replace(/<\/t[hd]>/gi, " |")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(
      /<\/?(p|div|section|ul|ol|table|figure|figcaption|aside|header|footer|blockquote|dl|dt|dd)[^>]*>/gi,
      "\n\n",
    )
    .replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  const lines = s
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, " ").trim())
    .map((l) => l.replace(/\*\*\s+/g, "**").replace(/\s+\*\*(?=[.,;:]|$)/g, "**"));
  // Markdown tables need a separator row after the header row.
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);
    if (
      lines[i].startsWith("|") &&
      !lines[i - 1]?.startsWith("|") &&
      lines[i + 1]?.startsWith("|")
    ) {
      out.push("|" + " --- |".repeat(lines[i].split("|").length - 2));
    }
  }
  // A list item that wraps block tags (<li><p>..</p></li>) leaves "-" alone on a line.
  return out
    .join("\n")
    .replace(/^-\n+(?=\S)/gm, "- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
