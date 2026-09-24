import type { MetadataRoute } from "next";

import { getBlogs, getProjects, getSite } from "@/lib/content";
import { hasBody } from "@/lib/markdown";

/*
  Every page the build actually emits, and nothing else: the home page plus the
  project and post detail routes, whose conditions are the same ones
  generateStaticParams uses. `trailingSlash` is on, so the URLs carry one.
*/
/* A static export has no server to run these on request, so both are
   emitted once at build time. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = getSite();
  if (!url) return [];

  const at = (path: string) => new URL(path, url).toString();
  const lastModified = new Date();

  const projects = getProjects()
    .items.filter(
      (project) => project.details.length > 0 || hasBody("projects", project.slug),
    )
    .map((project) => ({
      url: at(`/projects/${project.slug}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const posts = getBlogs()
    .items.filter(
      (post) => post.slug && (post.details.length > 0 || hasBody("blog", post.slug)),
    )
    .map((post) => ({
      url: at(`/blog/${post.slug}/`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    { url: at("/"), lastModified, changeFrequency: "weekly" as const, priority: 1 },
    ...projects,
    ...posts,
  ];
}
