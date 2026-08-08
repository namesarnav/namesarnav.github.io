import type { Metadata } from "next";
import PillNav from "@/components/PillNav";
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
      <PillNav home={false} />

      <section className="flex min-h-[70vh] flex-col justify-center px-16 pt-32 pb-16 max-[860px]:px-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Parallax speed={-0.06} className="block text-sm font-semibold uppercase tracking-[.08em] text-fg-muted">
            Index — 02
          </Parallax>
          <Parallax speed={-0.06} className="my-5 mb-8 text-[clamp(56px,9vw,144px)] leading-[.95] font-bold tracking-[-0.03em]">
            All Work.
          </Parallax>
          <p className="m-0 max-w-[640px] text-[clamp(18px,1.8vw,22px)] text-fg-muted">
            Every project, big or small — research pipelines, production apps, and things still in progress.
          </p>
        </div>
      </section>

      <section className="px-16 pb-[180px] max-[860px]:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-3 gap-8 max-[860px]:grid-cols-1">
            {allProjects.map((project) => (
              <Reveal key={project.index} amount={0.1} y={24} className="h-full">
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
