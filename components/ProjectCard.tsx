import type { Project } from "@/lib/content";

interface ProjectCardProps {
  project: Project;
  variant?: "home" | "index";
}

export default function ProjectCard({ project, variant = "home" }: ProjectCardProps) {
  const { index, title, period, description, tags, demo, code, pending } = project;
  const titleSize = variant === "home" ? "text-[32px]" : "text-[28px]";

  return (
    <div className="avp-card flex flex-col gap-5 rounded-card border border-border bg-bg-alt p-10">
      <div className="flex items-start justify-between">
        <span className="text-sm font-semibold text-fg-muted">{index}</span>
        <span className="text-sm text-fg-muted">{period}</span>
      </div>
      <h3 className={`${titleSize} m-0 font-bold tracking-[-0.01em]`}>{title}</h3>
      <p
        className={`m-0 flex-1 text-base leading-[1.6] text-fg-muted ${variant === "home" ? "text-justify" : "text-left"}`}
      >
        {description}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border px-3 py-[6px] text-xs text-fg-muted">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-6 border-t border-border pt-4">
        {pending ? (
          <span className="text-sm text-fg-muted">Case study in progress</span>
        ) : (
          <>
            {demo && (
              <a href={demo} target="_blank" rel="noopener" className="avp-link-arrow flex items-center gap-1.5 text-sm font-semibold">
                Demo <span className="avp-arrow">↗</span>
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noopener" className="avp-link-arrow flex items-center gap-1.5 text-sm font-semibold">
                Code <span className="avp-arrow">↗</span>
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}
