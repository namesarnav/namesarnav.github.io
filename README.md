# namesarnav.github.io

Personal site of Arnav Verma, built with [Jekyll](https://jekyllrb.com) on the
[Hyde](https://github.com/poole/hyde) theme by [@mdo](https://github.com/mdo) (MIT).

The previous Next.js site lives on the `legacy-2` branch (and the one before
that on `legacy-site`).

## Where things live

| What | Where |
| --- | --- |
| Site title, tagline, sidebar nav, sidebar colour | `_config.yml` |
| Homepage text, photo, "Latest" list | `_data/hero.yml`, `_data/news.yml` |
| Contact details and social links (sidebar + homepage) | `_data/contact.yml` |
| Research, education, skills, certifications, documents | `_data/*.yml` |
| Projects (one file each, front matter = card) | `_projects/<slug>.md` |
| Writing (one file each, front matter = card) | `_posts/YYYY-MM-DD-<slug>.md` |
| Images, PDFs | `projects/`, `blog/`, `logos/`, `certifications/`, `documents/` |
| Hyde CSS (untouched) / site additions | `public/css/{poole,hyde,syntax}.css` / `public/css/site.css` |

Posts and projects support GitHub-flavoured Markdown, ```` ```mermaid ```` fences,
and maths (`$$…$$`, inline or display) on pages with `math: true` in their front
matter. Liquid is switched off inside them, so `{{ }}` in code samples is safe.

To change the sidebar colour, set `theme_class` in `_config.yml` to one of
Hyde's `theme-base-08` … `theme-base-0f`. `reverse_layout: true` moves the
sidebar to the right.

## Run locally

```bash
bundle install
bundle exec jekyll serve      # http://localhost:4000
```

## Deploy

Every push to `main` builds with Jekyll and deploys through GitHub Actions
(`.github/workflows/deploy.yml`). Pages source must be set to **GitHub Actions**.
