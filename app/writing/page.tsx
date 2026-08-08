import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
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
      <SiteNav active="writing" />

      <section className="px-12 pt-[160px] pb-16 max-[860px]:px-6">
        <div className="mx-auto max-w-[1400px]">
          <Parallax speed={-0.06} className="block text-[13px] font-semibold uppercase tracking-[.08em] text-fg-muted">
            Index — 03
          </Parallax>
          <Parallax speed={-0.06} className="my-4 mb-6 text-[clamp(48px,8vw,120px)] leading-[.95] font-bold tracking-[-0.03em]">
            All Writing.
          </Parallax>
          <p className="m-0 max-w-[600px] text-[clamp(16px,1.6vw,20px)] text-fg-muted">
            Notes on research, engineering, and the occasional lesson learned the hard way.
          </p>
        </div>
      </section>

      <section className="px-12 pb-[140px] max-[860px]:px-6">
        <div className="mx-auto flex max-w-[1400px] flex-col">
          <div className="border-t border-border" />
          {allPosts.map((post) => (
            <Reveal key={post.title} amount={0.1} y={24}>
              <div className="avp-row border-b border-border py-[26px] px-1">
                <div className="flex flex-wrap items-center gap-6">
                  <span className="w-[90px] shrink-0 text-[13px] text-fg-muted">{post.status}</span>
                  <h3 className="m-0 flex-1 text-[clamp(17px,2.2vw,24px)] font-semibold tracking-[-0.01em]">
                    {post.title}
                  </h3>
                  <span className="shrink-0 text-[13px] text-fg-muted">{post.topic}</span>
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
