import type { Metadata } from "next";
import PillNav from "@/components/PillNav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import { allPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "All Writing — Arnav Verma",
  description: "Notes on research, engineering, and the occasional lesson learned the hard way.",
};

export default function WritingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <PillNav home={false} />

      <section className="flex min-h-[70vh] flex-col justify-center px-16 pt-32 pb-16 max-[860px]:px-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Parallax speed={-0.06} className="block text-sm font-semibold uppercase tracking-[.08em] text-fg-muted">
            Index — 03
          </Parallax>
          <Parallax speed={-0.06} className="my-5 mb-8 text-[clamp(56px,9vw,144px)] leading-[.95] font-bold tracking-[-0.03em]">
            All Writing.
          </Parallax>
          <p className="m-0 max-w-[640px] text-[clamp(18px,1.8vw,22px)] text-fg-muted">
            Notes on research, engineering, and the occasional lesson learned the hard way.
          </p>
        </div>
      </section>

      <section className="px-16 pb-[180px] max-[860px]:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-col">
          <div className="border-t border-border" />
          {allPosts.map((post) => (
            <Reveal key={post.title} amount={0.1} y={24}>
              <div className="avp-row border-b border-border px-1 py-8">
                <div className="flex flex-wrap items-center gap-8">
                  <span className="w-24 shrink-0 text-sm text-fg-muted">{post.status}</span>
                  <h3 className="m-0 flex-1 text-[clamp(19px,2.4vw,28px)] font-semibold tracking-[-0.01em]">
                    {post.title}
                  </h3>
                  <span className="shrink-0 text-sm text-fg-muted">{post.topic}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer variant="sub" />
    </div>
  );
}
