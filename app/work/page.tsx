import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import ProjectCard from "@/components/ProjectCard";
import { allProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "All Work — Arnav Verma",
  description: "Every project, big or small — research pipelines, production apps, and things still in progress.",
};

export default function WorkPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SiteNav active="work" />

      <section className="px-12 pt-[160px] pb-16 max-[860px]:px-6">
        <div className="mx-auto max-w-[1400px]">
          <Parallax speed={-0.06} className="block text-[13px] font-semibold uppercase tracking-[.08em] text-fg-muted">
            Index — 02
          </Parallax>
          <Parallax speed={-0.06} className="my-4 mb-6 text-[clamp(48px,8vw,120px)] leading-[.95] font-bold tracking-[-0.03em]">
            All Work.
          </Parallax>
          <p className="m-0 max-w-[600px] text-[clamp(16px,1.6vw,20px)] text-fg-muted">
            Every project, big or small — research pipelines, production apps, and things still in progress.
          </p>
        </div>
      </section>

      <section className="px-12 pb-[140px] max-[860px]:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-3 gap-6 max-[860px]:grid-cols-1">
            {allProjects.map((project) => (
              <Reveal key={project.index} amount={0.1} y={24}>
                <ProjectCard project={project} variant="index" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="sub" />
    </div>
  );
}
