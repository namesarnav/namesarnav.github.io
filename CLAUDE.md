@AGENTS.md

# Project memory

Personal portfolio for Arnav Verma. Deploys to
https://github.com/namesarnav/namesarnav.github.io via GitHub Actions
(static export, `out/`). Dev server runs on port 3111.

## The one rule

**No content in the code.** Every string a visitor reads comes from
`content/*.yaml`. Components are templates. If you find yourself typing a
project title, a course name, or a URL into a `.tsx` file, it belongs in YAML
instead. This is the user's core requirement — they edit YAML, never code.

## Shape

- `content/` — site, hero, education, research, projects, blogs, skills,
  contact. The only files edited day to day.
- `src/lib/content.ts` — the whole content layer: zod schemas, loaders,
  validation. Everything else reads from here.
- `src/components/sections/` — one file per section, all YAML-driven.
- `public/audio/` — tracks are auto-discovered; filenames are
  `{song name, artist}.mp3` and get parsed for display by `src/lib/track-name.ts`.

## Validation philosophy

Fail loudly at build time. Schema errors name file, field and reason. Duplicate
project slugs, blog `details` without a `slug`, and missing `public/` assets all
break the build rather than degrading silently. This has already caught real
breakage in hand-edited YAML — keep it strict.

## Stack gotchas (each of these cost a debugging cycle)

- **Next 16 / React 19.** Read `node_modules/next/dist/docs/` — APIs differ from
  training data.
- **shadcn style is `base-nova`** → `@base-ui/react`, not Radix. Components take
  a `render` prop, not `asChild`.
- **js-yaml v5 has no default export**: `import { load as parseYaml }`.
- **zod `optionalText`** must have `.optional()` outermost or `.default({})`
  fails typecheck.
- **lucide-react has no brand icons** — simple-icons for those, and it has no
  `siLinkedin` or `siOpenreview` (trademark removals); those are hand-rolled.
- **`Instrument_Sans` `axes`** only accepts `"wdth"`.
- **Changing `<audio>` `src` fires a `pause` event** — the `switchingTrack` ref
  in `vibe-button.tsx` guards against it stopping playback on skip.
- **Flex `align-items: stretch`** silently stretches skill pills when the group
  label wraps; hence `items-start` on those lists.

## Working preferences

- **Push only when explicitly asked.** Commit and push are a separate step.
- When shown a reference site, match the **information format**, not the visual
  design. Notion-minimal is the look; don't import someone else's typography.
- Parallax was tried and explicitly removed. Don't reintroduce it.
- No browser has been available in these sessions — verify via `next build`,
  eslint, and grepping rendered HTML in `out/`.

## Known gaps (flagged, not yet actioned)

- No mobile nav — nav links are `hidden sm:block`. This is a defect.
- Research and Contact are still fictional placeholders (`yourhandle`,
  `example.com`). Two blogs and one project have real titles but seed bodies.
- `/documents/unt-transcript.pdf` 404s; `public/projects/polish.png` is unused.
- Missing: Experience section, CV, real favicon, OG image, sitemap, robots.txt.
- `design.md` is stale — still asks for parallax, predates Research and Writing.
