# namesarnav.github.io

Academic profile of Arnav Verma, built on the
[AcademicPages](https://github.com/academicpages/academicpages.github.io) Jekyll
template (a fork of Minimal Mistakes). Template licence: `LICENSE-academicpages`.

Earlier versions of the site: `legacy-2` (Next.js) and `legacy-site`.

## Where things live

| What | Where |
| --- | --- |
| Name, sidebar bio, affiliation, profile links | `_config.yml` → `author:` |
| Top-bar links | `_data/navigation.yml` |
| Homepage (About, News, Publications, Selected projects, Writing) | `_pages/about.md` |
| CV (education, skills, certifications) | `_pages/cv.md` |
| Publications, one file each (`authors:` list; `author.publication_name` in `_config.yml` is bolded) | `_publications/` |
| Projects, one file each (served at `/projects/<name>/`) | `_portfolio/` |
| Writing, one file each (served at `/blog/<slug>/`) | `_posts/` |
| Unlisted documents page | `_pages/documents.md` |
| Profile photo / social preview image | `images/profile.jpeg` / `images/og-image.png` |
| Font (Work Sans sitewide) | `_sass/_themes.scss`, `_includes/head/custom.html` |

Posts and projects support Mermaid (```` ```mermaid ````) and maths (`$$…$$`).
Liquid is switched off inside them, so `{{ }}` in code samples is safe.

### Changes made to the template

- `author-profile.html`: Hugging Face and Hashnode links (`author.huggingface`, `author.hashnode`).
- `archive-single.html` / `single.html`: an `in_progress` publication category,
  project thumbnails from any site path, no build-date "Published" line on projects.
- `_main.js`: wide Mermaid diagrams scroll instead of shrinking.

## Run locally

```bash
bundle install
npx uglify-js assets/js/plugins/jquery.greedy-navigation.js assets/js/_main.js assets/js/theme.js -c -m -o assets/js/main.min.js
bundle exec jekyll serve -l -H localhost   # open http://localhost:4000, not 127.0.0.1
```

## Deploy

Every push to `main` builds and deploys through GitHub Actions
(`.github/workflows/deploy.yml`, adapted from the template's own workflow).
