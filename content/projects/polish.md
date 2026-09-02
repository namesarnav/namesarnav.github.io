*Placeholder write-up — the shape is right, the detail is thin. Expand it when you have time.*

Word processors are good at formatting and bad at writing. Chat assistants are the
reverse: they will happily rewrite your third bullet, but you have to copy the
document out, paste it in, and paste the answer back. Polish puts the model inside
the editor, where the document already is.

Upload a resume in whatever format you have it — PDF, DOCX, RTF, TXT, LaTeX — edit
it with an inline assistant that sees the surrounding text, and export back out to
any of those formats.

## What it does

- **Format-agnostic import.** Bring a document in as PDF, DOCX, RTF, TXT or LaTeX
  and get a structured, editable document out the other side.
- **Inline AI editing.** Select a line, ask for a change, keep the ones you like.
  The assistant is scoped to the selection rather than regenerating the whole file.
- **Version history.** Every edit is a restorable version, so an aggressive rewrite
  is never a one-way door.
- **Autosave.** Drafts persist server-side; closing the tab does not cost you work.
- **Export anywhere.** PDF, DOCX and LaTeX out, from the same document model.

## How it is built

The frontend is Next.js 14 on the App Router with TypeScript, Tailwind v4 and
shadcn/ui. The backend is a separate Express service in TypeScript, with Prisma
over PostgreSQL for documents and versions, and Redis for sessions and caching.
Authentication is JWT with an access/refresh pair. Gemini 2.5 Flash does the
suggestion, scoring and summarisation work.

Both services are containerised and deployed to Railway alongside managed Postgres
and Redis; GitHub Actions type-checks every push.

## Notes to expand

- Why the editor keeps a structured document model instead of raw text, and what
  that buys on export.
- How inline prompts are scoped so a suggestion does not clobber unrelated sections.
- What the version history costs in storage, and when it gets pruned.
