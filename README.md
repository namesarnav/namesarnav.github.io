# namesarnav.github.io

Academic profile of Arnav Verma, built with [Jekyll](https://jekyllrb.com). The
layout (top bar, profile column, single reading column, dark mode) follows
[AcademicPages](https://academicpages.github.io).

The previous Next.js site lives on the `legacy-2` branch (and the one before
that on `legacy-site`).

## Where things live

| What | Where |
| --- | --- |
| Site title, tagline, top-bar nav | `_config.yml` |
| Bio, photo, affiliation, News list | `_data/hero.yml`, `_data/news.yml` |
| Email and profile links (icons: `_data/social_names.yml`) | `_data/contact.yml` |
| Publications (`research.yml`), education, skills, certifications, documents | `_data/*.yml` |
| Projects (one file each, front matter = card) | `_projects/<slug>.md` |
| Writing (one file each, front matter = card) | `_posts/YYYY-MM-DD-<slug>.md` |
| Images, PDFs | `projects/`, `blog/`, `logos/`, `certifications/`, `documents/` |
| All styles (light and dark tokens at the top) | `assets/css/main.css` |

Posts and projects support GitHub-flavoured Markdown, ```` ```mermaid ```` fences,
and maths (`$$…$$`, inline or display) on pages with `math: true` in their front
matter. Liquid is switched off inside them, so `{{ }}` in code samples is safe.

## Run locally

```bash
bundle install
bundle exec jekyll serve      # http://localhost:4000
```

## Deploy

Every push to `main` builds with Jekyll and deploys through GitHub Actions
(`.github/workflows/deploy.yml`). Pages source must be set to **GitHub Actions**.
