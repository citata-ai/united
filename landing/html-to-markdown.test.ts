import { describe, expect, it } from "vitest";
import { decodeEntities, htmlToMarkdown } from "./scripts/html-to-markdown.mjs";

describe("htmlToMarkdown", () => {
  it("converts the tags our pages use", () => {
    const html =
      '<header>nav</header><main><h1>Title</h1><p>Hi <strong>you</strong>, see <a href="/about">About</a>.</p>' +
      "<ul><li>One</li><li>Two</li></ul><table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table></main>";
    expect(htmlToMarkdown(html, "https://citata.ai")).toBe(
      "# Title\n\nHi **you**, see [About](https://citata.ai/about).\n\n- One\n- Two\n\n| A | B |\n| --- | --- |\n| 1 | 2 |",
    );
  });

  it("keeps list items that wrap paragraphs on one line", () => {
    expect(htmlToMarkdown("<main><ul><li><p>A</p><p>B</p></li></ul></main>", "")).toBe("- A\n\nB");
  });

  it("drops scripts and images, keeps text", () => {
    expect(
      htmlToMarkdown('<main><script>x()</script><img src="a.png"><p>Text</p></main>', ""),
    ).toBe("Text");
  });

  it("decodes entities", () => {
    expect(decodeEntities("A &amp; B &#8212; &quot;c&quot; &#x27;d&#x27;")).toBe(
      "A & B — \"c\" 'd'",
    );
  });
});
