# Handoff: Arnav Verma — Portfolio Website

## Overview
Personal portfolio for an ML engineer / LLM researcher. One long homepage (Hero → About → Education → Skills → Work → Writing → Contact) plus two index pages (`/work`, `/writing`). Swiss-grid typography on a **dark-only** canvas, a floating glass pill nav, scroll parallax, scroll-reveal, and a WebGL "warped glass" treatment on the hero name.

## "Ask Arnav" chat (hero)
The hero includes a real AI-backed chat ("Ask anything about Arnav") — see `components/AskArnav.tsx`. Because this site is a static export (`next.config.ts` → `output: "export"`) deployed to GitHub Pages, there's no server to hold an API key, so the chat calls a separate Cloudflare Worker backend in `worker/`.

**Deploying the worker (one-time, or whenever `worker/src/knowledge.ts` changes):**
```
cd worker
npm install
npx wrangler login
npx wrangler kv namespace create RATE_LIMIT   # paste the id into wrangler.toml
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler deploy                            # note the printed *.workers.dev URL
```
Then set `NEXT_PUBLIC_CHAT_API_URL` (see `.env.example`) to that URL and rebuild/redeploy the Next.js site as usual. `worker/src/knowledge.ts` mirrors the bio/projects/education/skills in `lib/content.ts` as a plain string for the system prompt — update it by hand if `lib/content.ts` changes, since the worker has no shared build step with the Next app.

## About the Design Files
The files in `reference/` are **design references, not production code**. `Portfolio.dc.html`, `Projects.dc.html` and `Blog.dc.html` are authored in a proprietary "Design Component" templating format (`{{ }}` bindings, `<sc-for>` / `<sc-if>` control-flow tags, a `DCLogic` class, `<x-import>` mounts) that only runs inside the design tool — they will **not** execute as-is in a browser or React app.

Read them as a precise spec of structure, inline styles, copy, and interaction logic. **The task is to recreate this design in a real Next.js app.** `reference/WarpText.jsx` is the one exception — it is real React + WebGL and can be ported nearly verbatim.

## Fidelity
**High-fidelity.** Colors, type scale, spacing, copy, and motion values below are final. Implement pixel-accurately.

## Recommended Stack
- **Next.js 14+ (App Router) + TypeScript.**
- **Styling**: CSS Modules or Tailwind, mapping the tokens below to CSS custom properties / `tailwind.config`. The reference uses inline styles only because the design tool requires it — do **not** carry that over.
- **Animation**: Framer Motion (`motion/react`) for reveals and hover micro-interactions; keep the raw `requestAnimationFrame` scroll listener for parallax (cheaper than motion values here).
- **Hero effect**: port `WarpText.jsx` as a client component (`'use client'`). It's raw WebGL — no three.js needed.
- **Content**: Postgres + Prisma, fetched in Server Components (see Backend).

## Backend (adding projects/posts without a redeploy)
1. **DB**: Postgres on Supabase or Neon (free tier). SQLite + Prisma locally is fine to start.
2. **ORM**: Prisma.
   ```prisma
   model Project {
     id          String   @id @default(cuid())
     index       String
     title       String
     period      String
     description String
     tags        String[]
     demoUrl     String?
     codeUrl     String?
     published   Boolean  @default(true)
     createdAt   DateTime @default(now())
   }
   model Post {
     id        String   @id @default(cuid())
     title     String
     topic     String
     status    String   // "Soon" | "Published"
     slug      String?  @unique
     body      String?  // MDX once real posts exist
     published Boolean  @default(true)
     createdAt DateTime @default(now())
   }
   ```
3. **Admin**: password-gated `/admin` with Server Action forms for create/edit/delete. A shared password in middleware + an httpOnly cookie is enough for one author.
4. Replace the hardcoded `projects` / `posts` arrays in `renderVals()` with `await prisma.project.findMany({ where: { published: true }, orderBy: { index: 'asc' } })`.
5. Education and Skills stay hardcoded in a `content/` TS file — they change rarely and are structurally nested.
6. Project screenshots later: Vercel Blob or Cloudinary, URL on the Project model.

---

## Screens

### 1. Home (`/`)

#### Nav — floating pill, fixed
`position:fixed; top:22px; left:50%; translateX(-50%); z-index:100`. Padding 7px, `border-radius:999px`, `background:rgba(18,18,18,.72)`, `backdrop-filter:blur(20px)`, `1px solid rgba(244,243,239,.1)`, `box-shadow:0 22px 48px -24px rgba(0,0,0,.9)`. Entrance animation `avp-navdrop` — 0.7s, opacity 0→1 + translateY(-24px)→0, `cubic-bezier(.16,1,.3,1)`.

Contents left→right:
- **AV monogram** — 38×38 circle, `background: var(--fg)`, text `#0c0c0c`, 13px/700, letter-spacing -0.02em, links `#hero`. Hover: `rotate(-8deg) scale(1.06)`, 0.4s.
- **Links** (14px/500, `var(--fg-muted)` → `var(--fg)` on hover, padding 10px 18px, gap 2px), in this exact order: **About · Education · Skills · Work · Writing · Contact**.
- **CV button** — `margin-left:6px`, padding 10px 20px, pill, `background: var(--fg)`, text `#0c0c0c`, 14px/600, downloads `/Arnav-Verma-CV.pdf`. Hover: `translateY(-1px)`, background `var(--accent)`, text `#fff`. Active: `scale(.96)`.
- **Sliding hover indicator** — an absolutely positioned span (`top:7px; height:38px; background:rgba(244,243,239,.09); border-radius:999px`). On each link's `mouseenter`, measure the link rect against the nav rect and set `width` + `translateX`, `opacity:1`; transitions `transform`/`width` 0.38s `cubic-bezier(.16,1,.3,1)` and `opacity` 0.25s. Nav `mouseleave` → `opacity:0`.
- **≤860px**: links hide, a 38×38 hamburger button appears (`rgba(244,243,239,.09)` bg, 16px stroke-2 SVG). Tapping opens a full-viewport panel (`inset:0; z-index:90; background:var(--bg)`, column, 48px padding, 28px gap, links 36px/700, same order); tap anywhere closes.

#### Hero (`#hero`)
`min-height:100vh`, column, centered, padding `96px 48px 80px`.
- **Eyebrow row**: 8px red dot + a **typewriter** line — 13px/600, uppercase, letter-spacing .08em, `var(--fg-muted)`, followed by a 2px-wide × 0.85em blinking caret in `var(--accent)` (`avp-blink` 1s `step-start` infinite). Cycles: `Machine Learning Engineer` → `LLM Researcher` → `Full-stack Builder` → `Open to opportunities`. Timing: 55ms/char typing, 1400ms pause at full, 300ms before deleting, 30ms/char deleting, 300ms before the next phrase.
- **Headline**: "Arnav\nVerma." rendered through **WarpText** (below). Container height `clamp(200px,26vw,360px)`, `data-parallax="-0.08"`. Font `clamp(64px,10vw,168px)`, weight 700, line-height 0.92, letter-spacing -0.035em, color `#f4f3ef`, left-aligned. Under 860px the container font drops to `clamp(44px,14vw,72px)`.
- **Below a 1px top border**: 2-col grid `1.4fr / 1fr`, gap 40px, margin-top 40px, padding-top 32px.
  - Left: intro paragraph, `clamp(18px,2.2vw,26px)`, line-height 1.4, `var(--fg-muted)`, max-width 640px, `text-align: justify`. Copy: *"I build and evaluate large language models, from multi dimensional generalization research to production AI products used by real people."*
  - Right: column, gap 16px, both items `align-self:flex-end` — solid pill **"View Work"** (`var(--fg)` bg, `var(--bg)` text, 14px/600, padding 14px 28px) → `#work`; text link **"Download CV ↗"** (14px/600) → CV PDF.
- **"Scroll — 01"** bottom-left (`bottom:40px; left:48px`), 12px, uppercase, letter-spacing .08em, `var(--fg-muted)`, `data-parallax="0.35"`.

#### About (`#about`) — Index 02
Section pattern (used by every section below): `padding:140px 48px`, `border-top:1px solid var(--border)`, inner `max-width:1400px; margin:0 auto`. Header row: H2 left (`clamp(36px,5vw,64px)`/700, letter-spacing -0.02em, `data-parallax="-0.04"`), "Index — NN" right (13px/600 uppercase muted), 64px bottom margin.

Body max-width 820px, column, gap 24px:
- Lead paragraph `clamp(18px,2vw,24px)`, line-height 1.5, `var(--fg)`, `text-align: justify`.
- Secondary paragraph 16px, line-height 1.7, `var(--fg-muted)`, left-aligned.
- Outline pill button **"Download Full CV"** — transparent bg, `1px solid var(--fg)`, 14px/600, padding 14px 28px, `margin-top:12px`, `width:fit-content`.

#### Education (`#education`) — Index 03
One block per school, `padding:40px 0`, `border-top:1px solid var(--border)`, plus a closing 1px border after the last. Each block is a 2-col grid `1.1fr / 1fr`, gap 56px, `align-items:start`.
- **Left column** (column, gap 14px): school name `clamp(24px,3vw,36px)`/700, letter-spacing -0.015em, color `#F4F3EF`, with the period (13px muted, `white-space:nowrap`) baseline-aligned on the right of the same row; degree 17px `var(--fg)`; meta line 14px `var(--fg-muted)`.
  - **Affiliations** (if present): 12px/600 uppercase muted label, then wrapping pills — 13px, padding 7px 14px, `1px solid var(--border)`, `border-radius:999px`, gap 8px.
  - **Awards & Honors** (if present): same label style, then a column (gap 10px) of rows: 6px red dot (`var(--accent)`) + 15px `var(--fg)` text.
- **Right column**: 12px/600 uppercase muted "Coursework" label, then rows — space-between, `padding:12px 0`, `border-bottom:1px solid var(--border)`; course name 15px, grade 13px/600 in **`#4ade80`**, `white-space:nowrap`.

Data:
1. **New York University, Courant Institute of Mathematical Sciences** — M.S. Computer Science — Expected 05/28 — "Courant Institute of Mathematical Sciences · New York, NY". Affiliations: Tech@NYU, HackNYU. No awards. Coursework: Fundamental Algorithms / Machine Learning / Deep Learning, all "In progress".
2. **University of North Texas** — B.S. Computer Science · Mathematics Minor — 01/23 – 05/26 — "Denton, TX · GPA 3.70". Affiliations: IEEE Computer Society, UNT Computer Science Club, UNT AI Research Program. Awards: President's List; Dean's List; Undergraduate Research Fellowship; International Education Scholarship; 1st Place — HackSMU '24 & '25, HackUNT '23 & '24; 2nd Place — HackUTD '24 · Runner-up — HackTX (UT Austin). Coursework: Algorithms A+, Artificial Intelligence A+, Natural Language Processing A+, Linear Algebra A+, Data Structures A, Operating Systems A, Database Systems A, Computer Networks A, Discrete Mathematics A, Probability & Statistics A.

#### Skills (`#skills`) — Index 04
Legend row above the list (flex, wrap, gap 28px, `margin-bottom:40px`): 9px dot + 13px muted label ×3 — **`#4ade80` "Proficient · daily driver"**, **`#60a5fa` "Working knowledge"**, **`#6b6b6b` "Basic familiarity"**.

Then one row per group: 2-col grid `220px / 1fr`, gap 32px, `padding:32px 0`, `border-top:1px solid var(--border)` (+ closing border). Left = 13px/600 muted index + 13px/600 uppercase label (letter-spacing .08em). Right = wrapping skill pills: 14px, padding 9px 16px, `border:1px solid`, `border-radius:999px`, gap 10px, hover `translateY(-3px)` 0.3s.

Pill border colors by level (base → hover):
- green: `rgba(74,222,128,.45)` → `#4ade80`
- blue: `rgba(96,165,250,.45)` → `#60a5fa`
- gray: `var(--border)` → `rgba(244,243,239,.45)`

Groups (order within each group is green → blue → gray):
- **01 Languages** — green: Python, C/C++ · blue: JavaScript, TypeScript · gray: Rust, Flutter
- **02 AI / ML** — green: PyTorch, TensorFlow, Keras, Scikit-learn, NumPy, Pandas, HuggingFace, LangChain, LlamaIndex, Ollama, Pinecone, Chroma, Deep Learning, LLM Evaluation · blue: JAX, vLLM, TensorRT, n8n, Gradio, Streamlit · gray: OpenCV, YOLO, spaCy, ONNX
- **03 Libraries & Frameworks** — blue: Flask, FastAPI, Express, Next.js, React, React Native
- **04 Tools** — green: Docker, Terraform, PostgreSQL, MongoDB · blue: Kubernetes, Jenkins, Ansible · gray: Google AI Studio
- **05 Concepts** — green: AI Agent Development, Software Development · blue: DevOps, API Development

#### Selected Work (`#work`) — Index 05
Header right column also carries a "View all work ↗" link (14px/600) → `/work`. 3-col grid (1-col ≤860px), gap 24px. Card: column, gap 18px, padding 32px, `1px solid var(--border)`, `border-radius:4px`, `background: var(--bg-alt)`. Contents: index/period row (13px muted) → title 26px/700 letter-spacing -0.01em → description 15px/1.6 muted (`flex:1`) → tag pills (11px, padding 5px 10px, pill border, muted) → footer row (gap 20px, `padding-top:12px`, `border-top:1px solid var(--border)`) with "Demo ↗" / "Code ↗" 13px/600 links (Demo omitted when there's no demo URL).

Card hover: `translateY(-10px) scale(1.012)` over 0.55s, **plus** a masked 1.5px gradient border ring fading in over 0.5s — `linear-gradient(125deg, var(--accent), transparent 45%, transparent 55%, var(--accent))` applied via the `padding` + `-webkit-mask` / `mask-composite: exclude` technique, `border-radius:4px`, `pointer-events:none`.

Projects:
1. **01 · Polish · 2025** — "Full-stack AI resume SaaS with Claude & Gemini-powered feedback, full version control with diff comparison, and Dockerized CI/CD on Railway." Tags: Next.js, Express, PostgreSQL, Redis. Demo `https://polish-client-production.up.railway.app/` · Code `https://github.com/PolishAI-app/polish`
2. **02 · Marigold · 2025** — "AI study app that turns uploaded PDFs into Gemini-generated flashcards and timed quizzes, secured with JWT rotation and httpOnly cookies." Tags: React, FastAPI, MongoDB, PyMuPDF. Demo `https://marigold-production.up.railway.app/` · Code `https://github.com/namesarnav/marigold`
3. **03 · LLM Generalization Study · 2025–Present** — "Multi-dimensional generalization study across 42 model configurations (LLaMA, Qwen, Mistral), evaluating domain shift, adversarial robustness and compositionality on temporal extraction." Tags: PyTorch, HuggingFace, RoBERTa, T5. No demo · Code `https://github.com/namesarnav`

#### Writing (`#writing`) — Index 06
"View all writing ↗" → `/writing`. A list, not a grid: each row `border-top:1px solid var(--border)`, `padding:28px 0`, flex with gap 24px — status (13px muted, fixed 90px) · title (`clamp(18px,2.4vw,28px)`/600, `flex:1`) · topic (13px muted). Closing 1px border after the last row.

Posts (all status "Soon"): "What breaks when LLMs meet clinical text" — Generalization · "Fine-tuned PLMs vs. prompted LLMs: a fairer comparison" — NLP · "Shipping Polish: lessons from a resume SaaS" — Engineering.

#### Contact (`#contact`) — Index 07
`padding:140px 48px 100px`. Eyebrow, then "Get in touch" H2 (margin `16px 0 48px`), then the email as a giant link — `mailto:av4445@nyu.edu`, `clamp(28px,6vw,64px)`/700, letter-spacing -0.02em, trailing ↗ at 0.6em, `margin-bottom:56px`, `width:fit-content`.

Social row: `padding-top:32px`, `border-top:1px solid var(--border)`, flex wrap, gap 40px. Each link 14px/600, `display:inline-block`, its own brand color, **hover `scale(1.12)`** over 0.3s `cubic-bezier(.2,.8,.2,1)` with `transform-origin:left center`. **No underline on these** — deliberately different from the nav links.

| Label | Color | URL |
|---|---|---|
| GitHub | `#FFFFFF` | github.com/namesarnav |
| LinkedIn | `#C0DCFF` | linkedin.com/in/namesarnav |
| Hugging Face | `#FFA744` | huggingface.co/namesarnav |
| Hashnode | `#2CE2B2` | hashnode.com/@namesarnav |
| Leetcode | `#E85B03` | leetcode.com/namesarnav |
| 𝕏 | `#FFFFFF` | x.com/namesarnav |

#### Footer
`padding:32px 48px`, `border-top:1px solid var(--border)`, space-between, 13px muted: "© 2026 Arnav Verma" · "Back to top ↑" → `#hero`.

### 2. All Work (`/work`) — `reference/Projects.dc.html`
Same nav/footer. Header: "Index — 02" eyebrow, "All Work." headline `clamp(48px,8vw,120px)`, one-line description. Then the full 3-col project grid: the 3 real projects followed by "coming soon" placeholder cards (tag "Coming soon", description "Case study write-up in progress — details coming soon.", footer reads "Case study in progress" instead of Demo/Code). Cards scroll-reveal with stagger.

### 3. All Writing (`/writing`) — `reference/Blog.dc.html`
Same nav/footer. Header: "Index — 03", "All Writing.", description. A single bordered list; each row `padding:26px 0`, hover shifts content 12px right and darkens the border. 3 real placeholder rows + generic "coming soon" rows cycling topic tags Research / Engineering / Notes / ML / Systems.

---

## WarpText (hero name effect) — `reference/WarpText.jsx`
Real, portable React + raw WebGL. It renders the text to an offscreen 2D canvas, uploads it as a texture, and displaces the sample coordinates in a fragment shader with layered noise plus a cursor-driven refraction/ripple term — a liquid-glass distortion that follows the pointer.

Props as used on the homepage:

| Prop | Value |
|---|---|
| `text` | `"Arnav\nVerma."` |
| `color` | `#f4f3ef` |
| `fontFamily` | `'Instrument Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif` |
| `fontSize` | `clamp(64px, 10vw, 168px)` |
| `fontWeight` | `700` |
| `letterSpacing` | `-0.035em` |
| `lineHeight` | `0.92` |
| `textAlign` | `left` |
| `warpStrength` | `0.09` |
| `warpScale` | `1.7` |
| `speed` | `0.55` |
| `pointerInfluence` | `0.42` |
| `pointerStrength` | `0.38` |
| `refraction` | `0.018` |
| `ripple` | `true` |
| container `style` | `{ height: 'clamp(200px, 26vw, 360px)' }` |

Port notes: mark it `'use client'`, keep the DPR-aware resize observer, and cancel the rAF loop on unmount. Respect `prefers-reduced-motion` by falling back to plain HTML text — the component is decorative and the name must always be readable/selectable for SEO, so also render the name in a visually-hidden `<h1>`.

`reference/DotGrid.jsx` from an earlier exploration is **not** part of the final design — ignore it if you see it referenced.

---

## Interactions & Behavior
- **Scroll reveal** — `IntersectionObserver`, threshold 0.15, adds `is-visible` on first intersect then unobserves. Base state `opacity:0; translateY(28px)`; transitions `opacity` and `transform` 0.7s `cubic-bezier(.16,1,.3,1)`. In Next.js use Framer Motion `whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}`.
- **Parallax** — elements carry `data-parallax="<speed>"`. On a `passive` scroll listener throttled by `requestAnimationFrame`: for normally-positioned elements `offset = (docTop - scrollY - innerHeight/2) * speed`, for `position:fixed` elements `offset = scrollY * speed`; clamp to ±30px (±70px when fixed) and apply as `translateY`. `docTop` is measured once on mount. All parallax elements get `will-change:transform`. Speeds used: `-0.08` (hero headline), `-0.04` (section H2s and index labels), `-0.05` (email link), `0.35` (scroll indicator).
- **Nav indicator** — see Nav above. Note it's driven by direct DOM style writes, not React state, so it stays smooth.
- **Card hover** — lift + gradient ring, see Work.
- **Button hover (`.avp-btn`)** — a `::after` panel in `var(--accent)` sweeps `scaleX(0)→1` from `transform-origin: left center` over 0.45s `cubic-bezier(.16,1,.3,1)` behind the label (`z-index:-1`, parent `isolation:isolate; overflow:hidden`); the button also lifts `translateY(-3px)`, border goes `var(--accent)`, text goes `#fff`. Active: `translateY(0) scale(.97)`.
- **Nav-link underline (`.avp-navlink`)** — 1px `var(--accent)` bar grows 0→100% width from the left, 0.3s. Used for text links **except** the contact social row.
- **Link arrow (`.avp-link-arrow`)** — the trailing ↗ nudges `translate(3px,-3px)` on hover, 0.3s.
- **Smooth scroll** — `html { scroll-behavior: smooth }` for the in-page anchors.
- **Dark only** — there is no theme toggle. Don't add one.

## Tweakable props (implemented as design-tool props; optional in the port)
- `navStyle`: `"glass" | "solid"` — default **glass** (the values above). "solid" drops the blur for an opaque nav.
- `motionIntensity`: `0–2`, step 0.25 — a global multiplier on parallax offsets and reveal distance. Wire it to a CSS variable if you want it; otherwise hardcode 1.

## Design Tokens

### Colors (dark only)
```css
:root {
  --bg:           #0c0c0c;
  --bg-alt:       #161616;
  --fg:           #f4f3ef;
  --fg-muted:     #9a988f;
  --accent:       #ff5147;
  --accent-rgb:   255, 81, 71;
  --border:       rgba(244, 243, 239, 0.14);
  --glass-bg:     rgba(22, 22, 22, 0.5);
  --glass-border: rgba(244, 243, 239, 0.1);
  --shadow:       rgba(0, 0, 0, 0.3);
}
```
Nav glass is a slightly different mix: `rgba(18,18,18,.72)` + `blur(20px)` + `1px solid rgba(244,243,239,.1)`.
Semantic accents: proficiency green `#4ade80`, blue `#60a5fa`, gray `#6b6b6b`. Course grades use the green.
Links: `a { color: var(--fg); text-decoration: none }`, `a:hover { color: var(--accent) }`.

### Typography
Font: **Instrument Sans** (Google Fonts, weights 400/500/600/700 + italic 400), fallback `'Helvetica Neue', Helvetica, Arial, sans-serif`. `-webkit-font-smoothing: antialiased`.

| Role | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Hero headline | `clamp(64px,10vw,168px)` | 700 | -0.035em | 0.92 |
| Page H1 (index pages) | `clamp(48px,8vw,120px)` | 700 | -0.03em | 0.95 |
| Section H2 | `clamp(36px,5vw,64px)` | 700 | -0.02em | — |
| School name | `clamp(24px,3vw,36px)` | 700 | -0.015em | — |
| Card title | 26px | 700 | -0.01em | — |
| Post title | `clamp(18px,2.4vw,28px)` | 600 | -0.01em | — |
| Hero intro | `clamp(18px,2.2vw,26px)` | 400 | — | 1.4 |
| About lead | `clamp(18px,2vw,24px)` | 400 | — | 1.5 |
| Body / secondary | 16px | 400 | — | 1.7 |
| Card body | 15px | 400 | — | 1.6 |
| Eyebrow / index label | 13px | 600 | .08em, uppercase | — |
| UI text (nav, links, pills) | 13–14px | 500–600 | — | — |
| Tag pill | 11px | 400 | — | — |

### Spacing / layout
- Max content width **1400px**, centered.
- Section padding **140px vertical / 48px horizontal**; horizontal drops to 24px ≤860px. Hero: `96px 48px 80px`. Contact: `140px 48px 100px`. Footer: `32px 48px`.
- Section-header bottom margin 64px.
- Grid gaps: 24px (cards), 32px (skills), 40px (hero row), 56px (education cols).
- Radii: **4px** cards, **999px** pills / buttons / icon buttons.
- Hairline: `1px solid var(--border)` for every divider and card outline.
- Breakpoint: **860px** — collapses the desktop nav, all 2-col and 3-col grids to 1-col, and shrinks the hero headline.

### Motion
- Standard ease `cubic-bezier(.16, 1, .3, 1)`; social-link scale uses `cubic-bezier(.2, .8, .2, 1)`.
- Durations: 0.25–0.35s hover, 0.38s nav indicator, 0.45s button sweep, 0.55s card lift, 0.7s reveals and nav entrance.

## Assets
- `reference/Arnav-Verma-CV.pdf` — the CV; also the source of all bio/education/project copy. Served from `/assets/Arnav-Verma-CV.pdf` in the design; put it in `public/` in Next.js.
- All icons are inline stroke SVG (16–24px, `currentColor`). No icon font, no emoji.
- No photography yet. If a headshot or project screenshots are added, keep them desaturated/monochrome so the red stays the only chromatic accent.

## Files
- `reference/Portfolio.dc.html` — homepage (all seven sections + nav + footer + data).
- `reference/Projects.dc.html` — `/work` index.
- `reference/Blog.dc.html` — `/writing` index.
- `reference/WarpText.jsx` — hero WebGL text component (portable).
- `reference/Arnav-Verma-CV.pdf` — source content.
