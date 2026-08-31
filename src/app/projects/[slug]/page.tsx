import { Code2, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DetailArticle } from "@/components/detail-article";
import { LinkButton } from "@/components/link-button";
import { getProject, getProjects } from "@/lib/content";
import { hasBody, renderBody } from "@/lib/markdown";

/**
 * One page per project with a body — either a `details:` block in projects.yaml
 * or a `content/projects/<slug>.md` file. Projects without one never link here,
 * so nothing dead-ends.
 */
export function generateStaticParams() {
  return getProjects()
    .items.filter(
      (project) =>
        project.details.length > 0 || hasBody("projects", project.slug),
    )
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const html = renderBody("projects", slug);
  if (!html && project.details.length === 0) notFound();

  const { code, demo } = project.links;

  return (
    <DetailArticle
      backHref="/#projects"
      backLabel="All projects"
      title={project.title}
      description={project.description}
      tags={project.tags}
      thumbnail={project.thumbnail}
      blocks={project.details}
      html={html}
      actions={
        code || demo ? (
          <>
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
          </>
        ) : null
      }
    />
  );
}
