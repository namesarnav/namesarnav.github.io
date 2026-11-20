---
title: "Evaluating Multi-Dimensional Generalization of Large Language Models in Temporal Extraction Tasks"
collection: publications
category: conferences
permalink: /publication/temporal-extraction-generalization
date: 2026-11-01
venue: 'Findings of the Association for Computational Linguistics: IJCNLP-AACL 2026'
authors: ["Fahmid Shahriar Iqbal", "Ritam Dutt", "Soumitra Das", "Arnav Verma", "Sagnik Ray Choudhury"]
paperurl: 'https://aclanthology.org/2026.findings-aacl.32.pdf'
url_landing: 'https://aclanthology.org/2026.findings-aacl.32/'
url_landing_label: 'ACL Anthology'
citation: 'Fahmid Shahriar Iqbal, Ritam Dutt, Soumitra Das, <b>Arnav Verma</b>, Sagnik Ray Choudhury. (2026). &quot;Evaluating Multi-Dimensional Generalization of Large Language Models in Temporal Extraction Tasks.&quot; <i>Findings of the Association for Computational Linguistics: IJCNLP-AACL 2026</i>, pp. 605–629.'
abstract: >-
  Time and event expression extraction are fundamental temporal reasoning tasks, but the problem
  remains difficult due to annotation ambiguity, domain sensitivity, and unstable model behavior.
  Existing evaluations focus on in-domain performance, offering limited insight into reliability
  under distribution shifts. We evaluate multiple model configurations across families,
  architectures, and reasoning strategies over four dimensions of generalization, examining
  transfer from base performance, cross-dimensional correlations, and the effects of scale,
  architecture, and prompting. This provides a systematic study of how prompted LLMs generalize in
  time and event expression extraction tasks. We find that strong base-task performance generally
  predicts better generalization. However, this relationship weakens under substantial
  distribution shifts. Inductive prompting performs most consistently across domain shift,
  adversarial perturbations, compositionality, and length increase, while gains from scale,
  architecture, and deductive and abductive prompting strategies are uneven and
  dimension-specific. We conclude that LLM generalization in temporal extraction tasks cannot be
  predicted from any single dimension alone and cannot be reliably inferred from in-domain or
  single-dimension evaluations, highlighting the need for reasoning strategies that generalize
  across dimensions.
bibtex: |
  @inproceedings{iqbal-etal-2026-evaluating,
      title = "Evaluating Multi-Dimensional Generalization of Large Language Models in Temporal Extraction Tasks",
      author = "Iqbal, Fahmid Shahriar  and
        Dutt, Ritam  and
        Das, Soumitra  and
        Verma, Arnav  and
        Choudhury, Sagnik Ray",
      editor = "Zhang, Yue  and
        Xu, Ruifeng  and
        Purwarianti, Ayu  and
        Rong, Tong  and
        Suzuki, Jun",
      booktitle = "Findings of the {A}ssociation for {C}omputational {L}inguistics: {IJCNLP}-{AACL} 2026",
      month = nov,
      year = "2026",
      address = "Hengqin, China",
      publisher = "Association for Computational Linguistics",
      url = "https://aclanthology.org/2026.findings-aacl.32/",
      doi = "10.18653/2026.findings-aacl.32",
      pages = "605--629",
      ISBN = "979-8-89176-444-6"
  }
---
