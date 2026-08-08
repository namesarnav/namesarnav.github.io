import type { Project } from "@/lib/content";

interface ProjectCardProps {
  project: Project;
  variant?: "home" | "index";
}

export default function ProjectCard({ project, variant = "home" }: ProjectCardProps) {
  const { index, title, period, description, tags, demo, code, pending } = project;
  const titleSize = variant === "home" ? "text-[26px]" : "text-2xl";

  return (
    <div className="avp-card flex flex-col gap-[18px] rounded-card border border-border bg-bg-alt p-8">
      <div className="flex items-start justify-between">
        <span className="text-[13px] font-semibold text-fg-muted">{index}</span>
        <span className="text-[13px] text-fg-muted">{period}</span>
      </div>
      <h3 className={`${titleSize} m-0 font-bold tracking-[-0.01em]`}>{title}</h3>
      <p
        className={`m-0 flex-1 text-[15px] leading-[1.6] text-fg-muted ${variant === "home" ? "text-justify" : "text-left"}`}
      >
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border px-2.5 py-[5px] text-[11px] text-fg-muted">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-5 border-t border-border pt-3">
        {pending ? (
          <span className="text-[13px] text-fg-muted">Case study in progress</span>
        ) : (
          <>
            {demo && (
              <a href={demo} target="_blank" rel="noopener" className="avp-link-arrow flex items-center gap-[5px] text-[13px] font-semibold">
                Demo <span className="avp-arrow">↗</span>
              </a>
            )}
            {code && (
              <a href={code} target="_blank" rel="noopener" className="avp-link-arrow flex items-center gap-[5px] text-[13px] font-semibold">
                Code <span className="avp-arrow">↗</span>
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}
