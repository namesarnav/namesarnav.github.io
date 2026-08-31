import "server-only";

import fs from "node:fs";
import path from "node:path";

import { load as parseYaml } from "js-yaml";
import { z } from "zod";

import { hasPostBody, listPostBodies } from "@/lib/markdown";

/**
 * Every piece of copy on this site comes from `content/*.yaml`.
 * Nothing below hardcodes text — it only describes the shape the YAML must take.
 *
 * Adding a field: extend the schema here, then read it in the matching section
 * component. Optional fields are genuinely optional: when they are absent the
 * component renders nothing for them, no placeholders.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

/** A string that is present and not just whitespace. Blank values are treated as absent. */
const nonEmpty = z.string().trim().min(1);

/** Optional text: missing, null, or blank all collapse to `undefined`. */
const optionalText = z
  .union([z.string(), z.number(), z.null()])
  .transform((value) => {
    if (value === null) return undefined;
    const text = String(value).trim();
    return text.length > 0 ? text : undefined;
  })
  .optional();

const optionalList = z.array(nonEmpty).optional().default([]);

/**
 * Dates are free-form. YAML may hand us a real date (`2026-05-04`) or a string
 * (`"Spring 2026"`); both are kept as text and only reformatted when they parse.
 */
const optionalDate = z
  .union([z.string(), z.date(), z.null()])
  .transform((value) => {
    if (value === null) return undefined;
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    const text = value.trim();
    return text.length > 0 ? text : undefined;
  })
  .optional();

// ---------------------------------------------------------------- site

const siteSchema = z.object({
  title: nonEmpty,
  description: optionalText,
  url: optionalText,
  brand: optionalText,
  nav: z
    .array(z.object({ label: nonEmpty, href: nonEmpty }))
    .optional()
    .default([]),
  footer: optionalText,
  /**
   * Copy for the 404 page. Every field falls back to a sensible default, so the
   * block can be trimmed to just the lines worth changing.
   */
  not_found: z
    .object({
      code: optionalText,
      heading: optionalText,
      message: optionalText,
      home_label: optionalText,
      /** Links offered under the message. Falls back to the main nav. */
      links: z
        .array(z.object({ label: nonEmpty, href: nonEmpty }))
        .optional(),
    })
    .optional()
    .default({}),
  /**
   * The "click here to vibe" button in the header. Drop the whole block — or
   * just `src` — and the button never renders.
   */
  vibe: z
    .object({
      /**
       * Leave this out and every audio file in `public/audio/` is picked up,
       * sorted by name — dropping a file in is all it takes. Set it to take
       * control of the order, or to name a track something other than its
       * filename.
       */
      tracks: z
        .array(
          z.union([
            nonEmpty.transform((src) => ({
              src,
              title: undefined as string | undefined,
              artist: undefined as string | undefined,
            })),
            z.object({ src: nonEmpty, title: optionalText, artist: optionalText }),
          ]),
        )
        .optional(),
      label: optionalText,
      playing_label: optionalText,
      /** Start again at the top of the playlist when the last track ends. */
      loop: z.boolean().optional().default(true),
      /** Play in a random order each time. */
      shuffle: z.boolean().optional().default(false),
      volume: z.number().min(0).max(1).optional().default(0.7),
    })
    .optional()
    .default({ loop: true, shuffle: false, volume: 0.7 }),
});

export const SOCIAL_KEYS = [
  "github",
  "linkedin",
  "huggingface",
  "hashnode",
  "medium",
  "youtube",
  "google_scholar",
  "open_review",
  "instagram",
  "spotify",
] as const;

export type SocialKey = (typeof SOCIAL_KEYS)[number];

/**
 * The "View GitHub" / "View Google Scholar" buttons that sit at the foot of a
 * section. Naming a `social` borrows that platform's icon and label, so
 * `{ social: github, href: ... }` renders as "View GitHub" with the right mark.
 * A `label` overrides the generated text; an entry with no `social` is a plain
 * button and gets no icon.
 */
const sectionActionsSchema = z
  .array(
    z
      .object({
        social: z.enum(SOCIAL_KEYS).optional(),
        label: optionalText,
        href: nonEmpty,
      })
      .refine((action) => action.social || action.label, {
        message: "needs a `social` or a `label` — otherwise the button has no text",
      }),
  )
  .optional()
  .default([]);

// ---------------------------------------------------------------- hero

const heroSchema = z.object({
  name: nonEmpty,
  title: nonEmpty,
  tagline: optionalText,
  location: optionalText,
  /** A file in `public/` (or a full URL). Omit it and the hero is text only. */
  photo: optionalText,
  /**
   * Screen-reader description. Defaults to the name, which is the right answer
   * for a portrait — override it only if the picture is of something else.
   */
  photo_alt: optionalText,
  actions: z
    .array(
      z.object({
        label: nonEmpty,
        href: nonEmpty,
        variant: z.enum(["primary", "secondary"]).optional().default("secondary"),
      }),
    )
    .optional()
    .default([]),
});

// ---------------------------------------------------------------- education

const educationSchema = z.object({
  heading: nonEmpty,
  actions: sectionActionsSchema,
  blurb: optionalText,
  items: z
    .array(
      z.object({
        institution: nonEmpty,
        /**
         * The institution's own colour, as hex. Hex only — it is written
         * straight into a style attribute, so nothing else is accepted.
         */
        color: nonEmpty
          .regex(/^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, "must be a hex colour, e.g. #57068C")
          .optional(),
        /** Overrides the auto-lightened colour used in dark mode. */
        color_dark: nonEmpty
          .regex(/^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i, "must be a hex colour, e.g. #B98FE0")
          .optional(),
        degree: optionalText,
        field: optionalText,
        location: optionalText,
        /** Free text — "01/23 – 05/26", "Expected 05/28", anything. */
        dates: optionalText,
        grade: optionalText,
        /** A file in `public/` or a full URL. Adds a "View transcript" button. */
        transcript: optionalText,
        affiliations: optionalList,
        awards: optionalList,
        coursework: z
          .array(z.object({ name: nonEmpty, grade: optionalText }))
          .optional()
          .default([]),
      }),
    )
    .optional()
    .default([]),
});

// ---------------------------------------------------------------- research

const paperSchema = z.object({
  title: nonEmpty,
  authors: optionalList,
  /**
   * Where the paper stands, in full: "Under review, 2026" while it is out,
   * the venue once it is accepted. One field, so nothing else changes later.
   */
  status: optionalText,
  year: optionalText,
  summary: optionalText,
  links: z
    .object({
      pdf: optionalText,
      arxiv: optionalText,
      code: optionalText,
      doi: optionalText,
    })
    .optional()
    .default({}),
});

const researchSchema = z.object({
  heading: nonEmpty,
  actions: sectionActionsSchema,
  blurb: optionalText,
  /** Bolded wherever it turns up in an author list. */
  highlight_author: optionalText,
  items: z.array(paperSchema).optional().default([]),
});

// ---------------------------------------------------------------- projects

const projectSchema = z.object({
  slug: nonEmpty.regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "must be lowercase words joined by hyphens, e.g. my-project",
  ),
  title: nonEmpty,
  description: optionalText,
  thumbnail: optionalText,
  tags: optionalList,
  links: z
    .object({
      code: optionalText,
      demo: optionalText,
      /** An external "Read more" target. Overrides the generated detail page. */
      read_more: optionalText,
    })
    .optional()
    .default({}),
  details: z
    .array(z.object({ heading: optionalText, body: nonEmpty }))
    .optional()
    .default([]),
});

const projectsSchema = z.object({
  heading: nonEmpty,
  actions: sectionActionsSchema,
  blurb: optionalText,
  /** How many rows show before the "View more" button. 0 shows everything. */
  initial_count: z.number().int().min(0).optional().default(3),
  items: z
    .array(projectSchema)
    .optional()
    .default([])
    .refine(
      (items) => new Set(items.map((item) => item.slug)).size === items.length,
      { message: "two projects share a slug — each one is a URL, so they must be unique" },
    ),
});

// ---------------------------------------------------------------- blogs

const blogSchema = z.object({
  /** Only required when the post carries `details`, since that becomes its URL. */
  slug: nonEmpty
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "must be lowercase words joined by hyphens, e.g. my-post",
    )
    .optional(),
  title: nonEmpty,
  description: optionalText,
  date: optionalDate,
  reading_time: optionalText,
  thumbnail: optionalText,
  tags: optionalList,
  /** Where the post is published, if anywhere. */
  url: optionalText,
  details: z
    .array(z.object({ heading: optionalText, body: nonEmpty }))
    .optional()
    .default([]),
});

const blogsSchema = z.object({
  heading: nonEmpty,
  actions: sectionActionsSchema,
  blurb: optionalText,
  /** How many rows show before the "View more" button. 0 shows everything. */
  initial_count: z.number().int().min(0).optional().default(3),
  items: z
    .array(blogSchema)
    .optional()
    .default([])
    .refine(
      (items) => items.every((item) => item.details.length === 0 || item.slug),
      { message: "a post with `details` also needs a `slug` — that becomes its URL" },
    ),
});

// ---------------------------------------------------------------- skills

/**
 * Proficiency shades a skill's pill. The order here is the order the legend
 * renders in, strongest first.
 */
export const SKILL_LEVELS = ["proficient", "working", "beginner"] as const;

export type SkillLevel = (typeof SKILL_LEVELS)[number];

/** A bare string is shorthand for a skill at the middle level. */
const skillItemSchema = z.union([
  nonEmpty.transform((name) => ({ name, level: "working" as SkillLevel })),
  z.object({
    name: nonEmpty,
    level: z.enum(SKILL_LEVELS).optional().default("working"),
  }),
]);

const skillsSchema = z.object({
  heading: nonEmpty,
  actions: sectionActionsSchema,
  blurb: optionalText,
  /**
   * Labels for the colour key. Drop a level's label and it vanishes from the
   * legend; drop the whole block and no legend renders at all.
   */
  legend: z
    .object(
      Object.fromEntries(SKILL_LEVELS.map((level) => [level, optionalText])) as {
        [K in SkillLevel]: typeof optionalText;
      },
    )
    .optional()
    .default({}),
  groups: z
    .array(
      z.object({
        name: nonEmpty,
        items: z.array(skillItemSchema).optional().default([]),
      }),
    )
    .optional()
    .default([]),
  /**
   * The contribution strip under the skill groups. The squares come from
   * content/generated/github-activity.json, refreshed on every deploy — only
   * the settings live here. Drop the block and the strip disappears.
   */
  activity: z
    .object({
      label: optionalText,
      /** How far back the strip reaches. Twelve is the full GitHub year. */
      months: z.number().int().min(1).max(12).optional().default(6),
    })
    .optional(),
});

// ---------------------------------------------------------------- certifications

const certificationsSchema = z.object({
  heading: nonEmpty,
  actions: sectionActionsSchema,
  blurb: optionalText,
  items: z
    .array(
      z.object({
        title: nonEmpty,
        /**
         * A badge or certificate image in `public/`. Badges are square and
         * certificates are landscape, so the frame letterboxes rather than
         * crops — nothing is cut off whichever you have.
         */
        thumbnail: optionalText,
        description: optionalText,
        /** Free text, so "Issued Mar 2026" and "2026-03-14" both work. */
        date: optionalText,
        /** Renders the "View credential" button. Omit it and no button shows. */
        credential: optionalText,
      }),
    )
    .optional()
    .default([]),
});

// ---------------------------------------------------------------- contact

/**
 * The order here is the order the buttons render in. A social is shown only when
 * the YAML carries a non-blank value for it.
 */
const contactSchema = z.object({
  heading: nonEmpty,
  actions: sectionActionsSchema,
  blurb: optionalText,
  email: optionalText,
  phone: optionalText,
  socials: z
    .object(Object.fromEntries(SOCIAL_KEYS.map((key) => [key, optionalText])) as {
      [K in SocialKey]: typeof optionalText;
    })
    .optional()
    .default({}),
});

// ---------------------------------------------------------------- types

export type Site = z.infer<typeof siteSchema>;
export type Certification = z.infer<typeof certificationsSchema>["items"][number];
export type Hero = z.infer<typeof heroSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Research = z.infer<typeof researchSchema>;
export type Paper = z.infer<typeof paperSchema>;
export type Projects = z.infer<typeof projectsSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Blogs = z.infer<typeof blogsSchema>;
export type Blog = z.infer<typeof blogSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type Contact = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------- loading

function readYaml(file: string): unknown {
  const filePath = path.join(CONTENT_DIR, `${file}.yaml`);
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch {
    throw new Error(
      `Missing content file: content/${file}.yaml — every section reads its copy from there.`,
    );
  }
  try {
    return parseYaml(raw) ?? {};
  } catch (error) {
    throw new Error(
      `content/${file}.yaml is not valid YAML.\n${(error as Error).message}`,
    );
  }
}

/**
 * A thumbnail pointing into `public/` has to actually be there. A missing file
 * renders as an empty frame and reports nothing, which is easy to ship without
 * noticing — so it fails the build instead.
 */
function assertAssetsExist(file: string, paths: (string | undefined)[]) {
  const referenced = [...new Set(paths.filter((p): p is string => !!p))];
  const missing = referenced
    .filter((p) => p.startsWith("/"))
    // The YAML holds a URL path, so %20 and friends have to come back out
    // before it can be matched against a filename on disk.
    .filter((p) => {
      let filePath = p;
      try {
        filePath = decodeURIComponent(p);
      } catch {
        // A malformed escape just falls through to the literal path.
      }
      return !fs.existsSync(path.join(PUBLIC_DIR, filePath));
    });

  if (missing.length > 0) {
    throw new Error(
      `content/${file}.yaml points at files that are not in public/:\n` +
        missing.map((p) => `  \u2022 ${p}`).join("\n"),
    );
  }
}

function load<T extends z.ZodType>(file: string, schema: T): z.infer<T> {
  const result = schema.safeParse(readYaml(file));
  if (result.success) return result.data;

  const problems = result.error.issues
    .map((issue) => `  • ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");
  throw new Error(`content/${file}.yaml does not match the expected shape:\n${problems}`);
}

const AUDIO_DIR = path.join(PUBLIC_DIR, "audio");
const AUDIO_EXTENSIONS = new Set([".mp3", ".m4a", ".aac", ".ogg", ".oga", ".opus", ".wav", ".flac", ".webm"]);

/**
 * Everything in `public/audio/`, in name order. Filenames go into a URL, so each
 * one is encoded — spaces and other awkward characters survive the trip.
 */
function discoverTracks(): { src: string; title?: string }[] {
  let files: string[];
  try {
    files = fs.readdirSync(AUDIO_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => AUDIO_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }))
    .map((file) => ({
      src: `/audio/${encodeURIComponent(file)}`,
      title: undefined,
      artist: undefined,
    }));
}

export const getSite = () => {
  const site = load("site", siteSchema);

  // An explicit list wins; otherwise the folder is the playlist.
  const tracks = site.vibe.tracks ?? discoverTracks();
  assertAssetsExist("site", tracks.map((track) => track.src));

  return { ...site, vibe: { ...site.vibe, tracks } };
};
export const getHero = () => {
  const hero = load("hero", heroSchema);
  assertAssetsExist("hero", [hero.photo]);
  return hero;
};
export const getEducation = () => load("education", educationSchema);
export const getResearch = () => load("research", researchSchema);
export const getProjects = () => {
  const projects = load("projects", projectsSchema);
  assertAssetsExist("projects", projects.items.map((item) => item.thumbnail));
  return projects;
};
export const getBlogs = () => {
  const blogs = load("blogs", blogsSchema);
  assertAssetsExist("blogs", blogs.items.map((item) => item.thumbnail));

  const slugs = new Set(blogs.items.flatMap((item) => (item.slug ? [item.slug] : [])));

  // A .md file with no matching entry would never be linked from anywhere, so
  // say so rather than leaving the post silently unreachable.
  const orphans = listPostBodies().filter((slug) => !slugs.has(slug));
  if (orphans.length > 0) {
    throw new Error(
      `content/blog/ has ${orphans.length > 1 ? "files" : "a file"} with no entry in ` +
        `blogs.yaml, so nothing links to ${orphans.length > 1 ? "them" : "it"}:\n` +
        orphans.map((slug) => `  - ${slug}.md (add an item with slug: "${slug}")`).join("\n"),
    );
  }

  // Two bodies for one post means one of them is dead text.
  const doubled = blogs.items.filter(
    (item) => item.details.length > 0 && hasPostBody(item.slug),
  );
  if (doubled.length > 0) {
    throw new Error(
      "these posts have both a `details:` block and a Markdown file — keep one:\n" +
        doubled.map((item) => `  - ${item.slug} (drop the details: block, or delete content/blog/${item.slug}.md)`).join("\n"),
    );
  }

  return blogs;
};
export const getSkills = () => load("skills", skillsSchema);
export const getCertifications = () => {
  const certifications = load("certifications", certificationsSchema);
  assertAssetsExist(
    "certifications",
    certifications.items.map((item) => item.thumbnail),
  );
  return certifications;
};
export const getContact = () => load("contact", contactSchema);

/** Looks up one project by its slug, for the generated detail pages. */
export function getProject(slug: string): Project | undefined {
  return getProjects().items.find((project) => project.slug === slug);
}

/** Looks up one post by its slug, for the generated detail pages. */
export function getBlog(slug: string): Blog | undefined {
  return getBlogs().items.find((post) => post.slug === slug);
}

/** The on-site page for a post, when it has one. */
export function blogDetailHref(post: Blog): string | undefined {
  if (!post.slug) return undefined;
  // Either source of a body earns the post a page here.
  const hosted = post.details.length > 0 || hasPostBody(post.slug);
  return hosted ? `/blog/${post.slug}` : undefined;
}

/**
 * Renders a date as "4 May 2026" when it parses, and verbatim when it does not —
 * so "Spring 2026" survives untouched. Fixed locale, since only the server
 * renders it.
 */
export function formatDate(value?: string): string | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

/** The URL for a project's "Read more", or `undefined` when there is nothing to read. */
export function readMoreHref(project: Project): string | undefined {
  if (project.links.read_more) return project.links.read_more;
  if (project.details.length > 0) return `/projects/${project.slug}`;
  return undefined;
}

export type SectionAction = z.infer<typeof sectionActionsSchema>[number];
