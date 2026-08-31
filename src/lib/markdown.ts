import fs from "node:fs";
import path from "node:path";

import { Marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

/**
 * GFM, so tables, strikethrough and task lists work the way they do on
 * Hashnode or Medium. `breaks` stays off: a single newline in the source is
 * still just a wrap, which is how Markdown is normally written.
 */
const marked = new Marked({ gfm: true, breaks: false });

/**
 * A ```mermaid fence becomes `<pre class="mermaid">` holding the diagram
 * source, which is the shape mermaid itself looks for. Drawing it needs a
 * browser, so the source is passed through here and the client component picks
 * it up — see `MermaidDiagrams`.
 */
marked.use({
  renderer: {
    code({ text, lang }) {
      if (lang?.trim().toLowerCase() !== "mermaid") return false;
      return `<pre class="mermaid">${escapeHtml(text)}</pre>\n`;
    },
  },
});

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Whether a rendered post needs the mermaid bundle loaded at all. */
export function hasMermaid(html?: string) {
  return !!html && html.includes('<pre class="mermaid">');
}

/**
 * A post's body lives at `content/blog/<slug>.md` — drop the file in and the
 * page exists. Nothing needs registering; the slug in blogs.yaml is the link
 * between the entry and its file.
 */
export function postBodyPath(slug: string) {
  return path.join(POSTS_DIR, `${slug}.md`);
}

export function hasPostBody(slug?: string) {
  return !!slug && fs.existsSync(postBodyPath(slug));
}

/** Every slug that has a Markdown file, whether or not blogs.yaml knows it. */
export function listPostBodies(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.slice(0, -".md".length));
}

/**
 * Renders the post to HTML at build time. The Markdown is the site owner's own
 * file from this repo, so it is trusted and raw HTML in it is passed through
 * deliberately — that is what makes an embed or a footnote possible.
 */
/**
 * Hashnode writes images as `![](url align="center")`. That trailing attribute
 * is not Markdown — the standard only allows a quoted title there — so `marked`
 * gives up on the whole image and leaves the raw text on the page. Pasting a
 * post straight out of Hashnode is the normal way content arrives here, so the
 * attributes are stripped rather than hand-edited out of every file.
 */
function stripImageAttributes(source: string) {
  return source.replace(
    /(!\[[^\]]*\]\()([^\s)]+)((?:\s+[a-zA-Z-]+="[^"]*")+)(\))/g,
    (_match, open, url, _attrs, close) => `${open}${url}${close}`,
  );
}

export function renderPostBody(slug: string): string | undefined {
  if (!hasPostBody(slug)) return undefined;
  const source = fs.readFileSync(postBodyPath(slug), "utf8");
  return marked.parse(stripImageAttributes(source), { async: false });
}
