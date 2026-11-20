---
permalink: /
title: "About"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

Hi, I'm Arnav Verma. I'm currently a Master's student in Computer Science at New York University's Courant Institute of Mathematical Sciences. Previously, I completed my Bachelor's in Computer Science, with a minor in Mathematics, at the University of North Texas.

I work on language model safety and evaluations, representation learning, and the systems that make it practical. I am currently working on efficient training and evaluation of multimodal models.

[CV](/cv/) · [Résumé (PDF)](/documents/resume.pdf)

## News
* Passed the CKAD exam — [Certified Kubernetes Application Developer](https://www.credly.com/badges/f5646465-5d5c-4567-bf56-23a64b9b6e54/public_url)
* Paper accepted to Findings of AACL-IJCNLP 2026 — see [Publications](/publications/)
* Started the M.S. in Computer Science at NYU Courant
* Check out [Marigold](/projects/marigold/), an app to help you study

## Publications
{% for post in site.publications reversed %}
* **{{ post.title }}**<br>{{ post.citation | split: " (20" | first }}<br>{% if post.category == "in_progress" %}<i>In progress</i>{% else %}<i>{{ post.venue }}</i>{% endif %}
{% endfor %}

## Selected projects
<ul class="thumb-list">
{% assign projects = site.portfolio | sort: "order" %}
{% for p in projects limit: 4 %}
  <li>
    <a class="thumb-list__img" href="{{ p.url | relative_url }}" tabindex="-1" aria-hidden="true">{% if p.header.teaser %}<img src="{{ p.header.teaser | relative_url }}" alt="" loading="lazy">{% endif %}</a>
    <div class="thumb-list__text">
      <a href="{{ p.url | relative_url }}"><strong>{{ p.title }}</strong></a>
      <span>{{ p.excerpt | strip_html | truncatewords: 20 }}</span>
    </div>
  </li>
{% endfor %}
</ul>

[All projects →](/projects/)

## Writing
<ul class="thumb-list">
{% for post in site.posts limit: 4 %}
  <li>
    <a class="thumb-list__img" href="{{ post.url | relative_url }}" tabindex="-1" aria-hidden="true">{% if post.header.teaser %}<img src="{{ post.header.teaser | relative_url }}" alt="" loading="lazy">{% endif %}</a>
    <div class="thumb-list__text">
      <a href="{{ post.url | relative_url }}"><strong>{{ post.title }}</strong></a>
      <span>{{ post.date | date: "%B %Y" }} · {{ post.excerpt | strip_html | truncatewords: 16 }}</span>
    </div>
  </li>
{% endfor %}
</ul>

[All writing →](/blog/)
