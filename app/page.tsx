import PillNav from "@/components/PillNav";
import Footer from "@/components/Footer";
import WarpText from "@/components/WarpText";
import Typewriter from "@/components/Typewriter";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import Button from "@/components/Button";
import ArrowLink from "@/components/ArrowLink";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import DotGrid from '@/components/DotGrid';
import AskArnav from "@/components/AskArnav";

import {
  typewriterPhrases,
  heroIntro,
  aboutLead,
  aboutSecondary,
  email,
  projects,
  posts,
  education,
  skillGroups,
  socials,
} from "@/lib/content";



export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <PillNav />

      {/* HERO */}
      <section id="hero" className="relative box-border flex min-h-screen flex-col justify-center px-16 pt-28 pb-24 max-[860px]:px-8">
        <div className="mx-auto w-full max-w-[1600px] pb-20">
          <Reveal className="mb-9 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <Typewriter phrases={typewriterPhrases} />
          </Reveal>

        
          <Parallax speed={-0.08} className="w-full" style={{ height: "clamp(240px, 30vw, 420px)" }}>
            <WarpText
              text={"Arnav\nVerma."}
              fontFamily="'Instrument Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
              fontSize="clamp(80px, 12vw, 200px)"
              fontWeight={700}
              letterSpacing="-0.035em"
              lineHeight={0.92}
              textAlign="left"
              warpStrength={0.09}
              warpScale={1.7}
              speed={0.55}
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0.018}
              ripple
            />
          </Parallax>

          <Reveal className="mt-14 grid grid-cols-[1.4fr_1fr] gap-12 border-t border-border pt-10 max-[860px]:grid-cols-1">
            <p className="m-0 max-w-[720px] text-justify text-[clamp(20px,2.4vw,30px)] leading-[1.4] font-normal text-fg-muted">
              {heroIntro}
            </p>
            <div className="flex flex-col items-start gap-5">
              <Button href="#work" variant="solid" className="self-end">
                View Work
              </Button>
              <ArrowLink href="/Arnav-Verma-CV.pdf" download underline className="self-end text-base font-semibold">
                Download CV
              </ArrowLink>
            </div>
          </Reveal>

          {/* <Reveal className="mt-10 flex justify-left">
            <AskArnav />
          </Reveal> */}
        </div>

        <Parallax speed={0.35} fixed className="absolute bottom-12 left-16 text-sm uppercase tracking-[.08em] text-fg-muted">
          Scroll — 01
        </Parallax>
      </section>

      {/* ABOUT */}
      <section id="about" className="flex min-h-screen flex-col justify-center border-t border-border px-16 py-32 max-[860px]:px-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal>
            <SectionHeader title="About" index="02" />
          </Reveal>
          <Reveal className="max-w-[920px]">
            <div className="relative flex flex-col gap-8">
              <p className="m-0 text-justify text-[clamp(20px,2.4vw,28px)] leading-[1.5] font-normal">{aboutLead}</p>
              <p className="m-0 text-left text-lg leading-[1.7] text-fg-muted">{aboutSecondary}</p>
              <Button href="/Arnav-Verma-CV.pdf" variant="outline" download className="mt-4 w-fit">
                Download Full CV
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="flex min-h-screen flex-col justify-center border-t border-border px-16 py-32 max-[860px]:px-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal>
            <SectionHeader title="Education" index="03" />
          </Reveal>

          {education.map((school) => (
            <Reveal key={school.name} className="border-t border-border py-12">
              <div className="grid grid-cols-[1.1fr_1fr] gap-16 max-[860px]:grid-cols-1">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="m-0 text-[clamp(28px,3.6vw,44px)] font-bold tracking-[-0.015em] text-fg">
                      {school.name}
                    </h3>
                    <span className="whitespace-nowrap text-sm text-fg-muted">{school.period}</span>
                  </div>
                  <div className="text-xl text-fg">{school.degree}</div>
                  <div className="text-base text-fg-muted">{school.meta}</div>

                  {school.affiliations && (
                    <div className="mt-4">
                      <div className="mb-3 text-sm font-semibold uppercase tracking-[.08em] text-fg-muted">
                        Affiliations
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {school.affiliations.map((aff) => (
                          <span key={aff} className="rounded-full border border-border px-4 py-2 text-sm text-fg">
                            {aff}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {school.awards && (
                    <div className="mt-5">
                      <div className="mb-3 text-sm font-semibold uppercase tracking-[.08em] text-fg-muted">
                        Awards &amp; Honors
                      </div>
                      <div className="flex flex-col gap-3">
                        {school.awards.map((award) => (
                          <div key={award} className="flex items-baseline gap-3">
                            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
                            <span className="text-base text-fg">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-5 text-sm font-semibold uppercase tracking-[.08em] text-fg-muted">Coursework</div>
                  <div className="flex flex-col">
                    {school.coursework.map((course) => (
                      <div
                        key={course.name}
                        className="flex items-center justify-between gap-4 border-b border-border py-3.5"
                      >
                        <span className="text-base">{course.name}</span>
                        <span className="whitespace-nowrap text-sm font-semibold text-lv-green">
                          {course.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="flex min-h-screen flex-col justify-center border-t border-border px-16 py-32 max-[860px]:px-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal>
            <SectionHeader title="Skills" index="04" />
          </Reveal>
          <Reveal className="mb-12 flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <span className="h-[10px] w-[10px] rounded-full bg-lv-green" />
              <span className="text-sm text-fg-muted">Proficient · daily driver</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-[10px] w-[10px] rounded-full bg-lv-blue" />
              <span className="text-sm text-fg-muted">Working knowledge</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-[10px] w-[10px] rounded-full bg-lv-gray" />
              <span className="text-sm text-fg-muted">Basic familiarity</span>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {skillGroups.map((group) => (
              <Reveal key={group.index} className="grid grid-cols-[240px_1fr] items-start gap-10 border-t border-border py-10 max-[860px]:grid-cols-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold text-fg-muted">{group.index}</span>
                  <span className="text-sm font-semibold uppercase tracking-[.08em]">{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <span
                      key={skill.name}
                      className={`avp-skill avp-lv-${skill.level} rounded-full border px-5 py-2.5 text-base`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="flex min-h-screen flex-col justify-center border-t border-border px-16 py-32 max-[860px]:px-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal>
            <SectionHeader
              title="Selected Work"
              index="05"
              right={
                <div className="flex flex-col items-end gap-2.5">
                  <span className="text-sm font-semibold uppercase tracking-[.08em] text-fg-muted">Index — 05</span>
                  <ArrowLink href="/work" className="text-base font-semibold">
                    View all work
                  </ArrowLink>
                </div>
              }
            />
          </Reveal>
          <div className="grid grid-cols-3 gap-8 max-[860px]:grid-cols-1">
            {projects.map((project) => (
              <Reveal key={project.index} className="h-full">
                <ProjectCard project={project} variant="home" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section id="writing" className="flex min-h-screen flex-col justify-center border-t border-border px-16 py-32 max-[860px]:px-8">
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal>
            <SectionHeader
              title="Writing"
              index="06"
              right={
                <div className="flex flex-col items-end gap-2.5">
                  <span className="text-sm font-semibold uppercase tracking-[.08em] text-fg-muted">Index — 06</span>
                  <ArrowLink href="/writing" className="text-base font-semibold">
                    <u>View All Writing</u>
                  </ArrowLink>
                </div>
              }
            />
          </Reveal>
          <div className="flex flex-col">
            {posts.map((post) => (
              <Reveal key={post.title} className="flex items-center gap-8 border-t border-border py-9">
                <span className="w-24 shrink-0 text-sm text-fg-muted">{post.status}</span>
                <h3 className="m-0 flex-1 text-[clamp(20px,2.8vw,34px)] font-semibold tracking-[-0.01em]">{post.title}</h3>
                <ArrowLink href="https://medium.com/@namesarnav/adapting-llama-for-ner-tasks-2a9ab3425f46" className="text-base font-semibold">
                  <span className="underline">Read Here</span>
                </ArrowLink>
              </Reveal>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="flex min-h-screen flex-col justify-center border-t border-border px-16 pt-32 pb-24 max-[860px]:px-8">
        <Reveal className="mx-auto w-full max-w-[1600px]">
          <Parallax speed={-0.04} className="block text-sm font-semibold uppercase tracking-[.08em] text-fg-muted">
            Index — 07
          </Parallax>
          <Parallax speed={-0.04} className="my-5 mb-16 text-[clamp(44px,6.5vw,84px)] font-bold tracking-[-0.02em]">
            Get in touch
          </Parallax>
          <Parallax speed={-0.05} className="mb-16 w-fit">
            <a
              href={`mailto:${email}`}
              className="avp-link-arrow flex w-fit items-center gap-5 text-[clamp(32px,7vw,80px)] font-bold tracking-[-0.02em]"
            >
              {email} <span className="avp-arrow text-[0.6em]">↗</span>
            </a>
          </Parallax>
          <div className="flex flex-wrap gap-12 border-t border-border pt-10">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener"
                className="avp-social text-base font-semibold"
                style={{ color: social.color }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <Footer variant="home" />
    </div>
  );
}
