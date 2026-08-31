import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import Image from "next/image";

import { LinkButton } from "@/components/link-button";
import { ExpandableList } from "@/components/expandable-list";
import { Section } from "@/components/section";
import { getProjects, readMoreHref, type Project } from "@/lib/content";

/**
 * A search-result row: thumbnail on the left, everything else stacked to its
 * right. One project per line, full width. Stacks vertically on phones.
 */
function ProjectRow({ project }: { project: Project }) {
  const readMore = readMoreHref(project);
  const { code, demo } = project.links;
  const hasActions = Boolean(readMore || code || demo);

  return (
    <div className="flex flex-col gap-4 py-7 sm:flex-row sm:gap-6">
      {project.thumbnail ? (
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-rule bg-surface sm:w-[280px] lg:w-[340px]">
          <Image
            src={project.thumbnail}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 340px"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <h3 className="text-[18px] font-semibold leading-[1.35] tracking-[-0.015em] text-foreground">
          {project.title}
        </h3>

        {project.description ? (
          <p className="mt-2 max-w-[68ch] text-[15px] leading-[1.6] text-foreground/80">
            {project.description}
          </p>
        ) : null}

        {project.tags.length > 0 ? (
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-tag px-2 py-1 text-[13px] leading-[1.3] text-tag-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        {hasActions ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {readMore ? (
              <LinkButton href={readMore} variant="default">
                Read more
                <ArrowRight data-icon="inline-end" />
              </LinkButton>
            ) : null}

            {code ? (
              <LinkButton href={code}>
                <Code2 data-icon="inline-start" />
                Code
              </LinkButton>
            ) : null}

            {demo ? (
              <LinkButton href={demo}>
                <ExternalLink data-icon="inline-start" />
                Demo
              </LinkButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const projects = getProjects();
  if (projects.items.length === 0) return null;

  return (
    <Section id="projects" heading={projects.heading} blurb={projects.blurb}>
      <ExpandableList initialCount={projects.initial_count}>
        {projects.items.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </ExpandableList>
    </Section>
  );
}
