# Portfolio

A single-scroll portfolio site. **All copy lives in `content/*.yaml`** — the code
in `src/` is template only and hardcodes no text. To change what the site says,
edit YAML; you never need to open a `.tsx` file.

Built with Next.js (App Router), Tailwind CSS v4, and shadcn/ui.

## Running it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build; fails loudly if the YAML is malformed
npm start
```

## Editing content

| File | What it controls |
| --- | --- |
| `content/site.yaml` | Page title, description, top-bar nav links, footer |
| `content/hero.yaml` | Your name, title, tagline, location, hero buttons |
| `content/education.yaml` | Education entries |
| `content/research.yaml` | Papers and preprints |
| `content/projects.yaml` | Project tiles **and** their detail pages |
| `content/blogs.yaml` | Blog posts |
| `content/skills.yaml` | Skill groups |
| `content/contact.yaml` | Email, phone, social links |

Every file is commented. Three rules cover almost everything:

1. **Optional means optional.** Delete a field you don't want and it renders
   nothing — no empty label, no placeholder. A blank value (`grade: ""`) counts
   as deleted.
2. **Lists grow and shrink.** Add or remove entries under `items:` / `groups:`
   freely; the layout adapts.
3. **Buttons follow the data.** A project's *Code* and *Demo* buttons appear only
   when `links.code` / `links.demo` exist. Contact's social buttons work the same
   way: list only the socials you actually use.

### Education

Each entry carries the institution and dates, the qualification, where it was and
how it went, then optional blocks for affiliations, awards, and coursework.

- `dates` is free text, so `"01/23 – 05/26"` and `"Expected 05/28"` both work. It
  sits beside the institution name, dropping below it when the name is long.
- `degree` and `field` join with a middot (`B.S. Computer Science · Mathematics
  Minor`), as do `location` and `grade` (`Denton, TX · GPA 3.70`).
- `color` tints the institution name in its own school colour — hex only, since
  it is written into a style attribute. Dark mode lightens it automatically so it
  stays readable on the dark page; `color_dark` overrides that if you want a
  specific shade. Omit both and the name renders in the normal text colour.
- `transcript` adds a quiet **View transcript** button at the foot of the entry.
  Point it at a file in `public/` (`/documents/unt-transcript.pdf`) or a full URL;
  external links open in a new tab. Omit it and no button appears.
- `affiliations` render as pills, `awards` as a marked list. Both optional.
- `coursework` is a list of `{ name, grade }`. The grade prints in green and is
  free text — `A+`, `In progress`, whatever fits. Omit `grade` for a bare row.

### The vibe button

The top bar carries a **Click here to vibe** button that plays music, with a
waveform that dances while it runs and notes drifting off the bottom.

**Adding songs: drop the file into `public/audio/`.** That is the whole process —
no YAML edit. Every audio file in that folder becomes a track, in name order
(`.mp3`, `.m4a`, `.aac`, `.ogg`, `.opus`, `.wav`, `.flac`, `.webm`).

**Name files `Song Name, Artist.mp3`.** The name and artist are read from the
filename, split on the last comma, and shown under the button while the track
plays. A file with no comma is all title and no artist. The split takes the
*last* comma, so `Hello, Goodbye, The Beatles.mp3` still resolves correctly.
Capitalisation and hyphens are kept exactly as you type them.

With more than one track the button gains a skip control, and each track rolls
into the next when it ends. Settings live in `site.yaml`:

```yaml
vibe:
  label: "Click here to vibe"
  playing_label: "Vibing"
  loop: true       # start over at the top when the last track ends
  shuffle: false   # play in a random order each time
  volume: 0.7
```

To fix the order, or override a name, list the tracks explicitly instead:

```yaml
  tracks:
    - "/audio/first.mp3"
    - { src: "/audio/second.mp3", title: "A Nicer Name", artist: "Someone" }
```

Delete every file from `public/audio/` (and leave `tracks` out) and the button
disappears. Nothing downloads until someone clicks, so the music costs ordinary
visitors nothing. The animation stops under `prefers-reduced-motion`.

On a wide screen the button pins itself to the very top-right corner of the
viewport, clear of the nav; on narrower screens it tucks back into the header row
as a compact waveform.

### Research

Each entry is a paper. `status` carries the whole truth about where it stands —
`"Under review, 2026"` while it is out, the venue (`"NeurIPS 2026"`) once it is
accepted. Nothing else changes when that happens.

Naming the venue while a paper is under review is only safe if that venue's
anonymity policy allows it; `"Under review, 2026"` with no venue is the option
that works everywhere.

`highlight_author` is your name, bolded automatically wherever it appears in an
`authors` list — write it exactly as it appears there. Links (`pdf`, `arxiv`,
`code`, `doi`) each add a button, and only when present.

### Projects

Each entry under `items:` becomes one full-width row — thumbnail on the left,
then title, description, tag pills, and buttons — laid out like a video search
result. Rows stack vertically on phones.

`initial_count: 3` sets how many rows show before a **View more** button appears
below the list; the button carries the number still hidden. Set it to `0` to show
everything with no button. Writing takes the same option. Hidden rows stay in the
page's HTML, so search engines still see the full list.

- `slug` — lowercase-with-hyphens; it becomes the detail page URL.
- `thumbnail` — a path under `public/`, e.g. `/projects/my-shot.png`. Omit it and
  the tile renders without an image. Roughly 16:7 crops best.
- `details` — a list of `{ heading, body }` blocks. **If `details` is present, a
  page is generated at `/projects/<slug>` and a "Read more" button appears.** If
  it's absent, no button and no page. To point "Read more" somewhere external
  instead, set `links.read_more`.

Blank lines inside a `body` become paragraph breaks.

### Writing

Posts render as the same rows as projects, with a date and reading time under the
title. Each entry has two independent ways to be read, and shows a button for
whichever it has:

- `url:` — where the post is published (Hashnode, Medium, wherever). Adds a
  **Read post** button that opens in a new tab.
- `details:` — the same `{ heading, body }` blocks projects use. Adds a **Read
  more** button and generates a page at `/blog/<slug>`. A post with `details`
  needs a `slug`; one that only links out does not.

A post can have both, in which case it shows both buttons. `date`, `reading_time`,
`thumbnail`, and `tags` are all optional. Posts appear in the order you list them,
so put the newest first.

### Skills

Each item is either a plain string or a `{ name, level }` pair. Levels shade the
pill: `proficient` green, `working` blue, `beginner` grey. A plain string means
`working`.

```yaml
items:
  - { name: "Python", level: proficient }
  - "SQL"                                  # same as level: working
```

The colour key at the top of the section is drawn from `legend:`. Rename the
labels to whatever you like, delete one to drop it from the key, or delete the
whole `legend:` block to hide the key.

### Contact socials

Supported keys, rendered in this order:
`github`, `linkedin`, `huggingface`, `hashnode`, `youtube`, `google_scholar`,
`open_review`, `instagram`, `spotify`.

### If the YAML is wrong

The site fails with a message naming the file, the field, and the problem — for
example a `slug` with spaces in it. It never renders half-broken.

## How it's put together

```
content/                     ← the only files you edit day to day
public/projects/             ← project thumbnails
public/audio/                ← the vibe button's track
src/lib/content.ts           ← reads + validates the YAML (one schema per file)
src/components/section.tsx   ← the shared section shell
src/components/expandable-list.tsx ← the View more behaviour
src/components/sections/     ← one component per section
src/app/globals.css          ← Notion's palette as CSS variables
src/app/projects/[slug]/     ← generated project detail pages
src/app/blog/[slug]/         ← generated post pages
```

**Design notes.** Light theme by default, with a toggle in the top bar (the OS
preference does not override it). Colours are Notion's: `#FFFFFF` / `rgb(55,53,47)`
in light, `#191919` / `rgba(255,255,255,0.81)` in dark, with the same hairline
rules Notion uses instead of shadows or boxes. Type is Instrument Sans (variable).
There is no scroll animation — the page is a straight linear scroll.

**Adding a field.** Extend the schema in `src/lib/content.ts`, then read it in the
matching component under `src/components/sections/`.
