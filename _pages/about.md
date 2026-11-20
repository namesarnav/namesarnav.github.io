---
permalink: /
title: "About"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

Hi, I'm Arnav Verma. I'm currently a Master's student in Computer Science at New York University's Courant Institute of Mathematical Sciences. Previously, I completed my Bachelor's in Computer Science, with a minor in Mathematics, at the University of North Texas.

I work on language model safety, evaluation, and interpretability. I am also interested in representation learning and, more recently, world models.

[CV](/cv/) · [Résumé (PDF)](/documents/resume.pdf)

## News
* Passed the CKAD exam — [Certified Kubernetes Application Developer](https://www.credly.com/badges/f5646465-5d5c-4567-bf56-23a64b9b6e54/public_url)
* Paper accepted to Findings of AACL-IJCNLP 2026 — see [Publications](/publications/)
* Started the M.S. in Computer Science at NYU Courant
* Check out [Marigold](/projects/marigold/), an app to help you study

## Publications
{% for post in site.publications reversed %}
* **{{ post.title }}**<br>{% include author-list.html authors=post.authors %}<br>{% if post.category == "in_progress" %}<i>In progress</i>{% else %}<i>{{ post.venue }}</i>{% endif %}{% if post.paperurl %} · <a href="{{ post.paperurl }}">PDF</a>{% endif %}
{% endfor %}

## Selected projects
<ul class="media-list">
{% assign projects = site.portfolio | sort: "order" %}
{% for p in projects limit: 4 %}{% include media-row.html item=p %}{% endfor %}
</ul>

[All projects →](/projects/)

## Writing
<ul class="media-list">
{% for post in site.posts limit: 4 %}{% include media-row.html item=post %}{% endfor %}
</ul>

[All writing →](/blog/)
