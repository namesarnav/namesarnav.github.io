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
      <section id="hero" className="relative box-border flex min-h-screen flex-col justify-center px-12 pt-24 pb-20 max-[860px]:px-6">
        <div className="mx-auto w-full max-w-[1400px] pb-[72px]">
          <Reveal className="mb-7 flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <Typewriter phrases={typewriterPhrases} />
          </Reveal>

          <Parallax speed={-0.08} className="w-full" style={{ height: "clamp(200px, 26vw, 360px)" }}>
            <WarpText
              text={"Arnav\nVerma."}
              color="#f4f3ef"
              fontFamily="'Instrument Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
              fontSize="clamp(64px, 10vw, 168px)"
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

          <Reveal className="mt-10 grid grid-cols-[1.4fr_1fr] gap-10 border-t border-border pt-8 max-[860px]:grid-cols-1">
            <p className="m-0 max-w-[640px] text-justify text-[clamp(18px,2.2vw,26px)] leading-[1.4] font-normal text-fg-muted">
              {heroIntro}
            </p>
            <div className="flex flex-col items-start gap-4">
              <Button href="#work" variant="solid" className="self-end">
                View Work
              </Button>
              <ArrowLink href="/Arnav-Verma-CV.pdf" download underline className="self-end text-sm font-semibold">
                Download CV
              </ArrowLink>
            </div>
          </Reveal>
        </div>

        <Parallax speed={0.35} fixed className="absolute bottom-10 left-12 text-xs uppercase tracking-[.08em] text-fg-muted">
          Scroll — 01
        </Parallax>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-border px-12 py-[140px] max-[860px]:px-6">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeader title="About" index="02" />
          </Reveal>
          <Reveal className="max-w-[820px]">
            <div className="relative flex flex-col gap-6">
              <p className="m-0 text-justify text-[clamp(18px,2vw,24px)] leading-[1.5] font-normal">{aboutLead}</p>
              <p className="m-0 text-left text-base leading-[1.7] text-fg-muted">{aboutSecondary}</p>
              <Button href="/Arnav-Verma-CV.pdf" variant="outline" download className="mt-3 w-fit">
                Download Full CV
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="border-t border-border px-12 py-[140px] max-[860px]:px-6">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeader title="Education" index="03" />
          </Reveal>

          {education.map((school) => (
            <Reveal key={school.name} className="border-t border-border py-10">
              <div className="grid grid-cols-[1.1fr_1fr] gap-14 max-[860px]:grid-cols-1">
                <div className="flex flex-col gap-3.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="m-0 text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.015em] text-[#F4F3EF]">
                      {school.name}
                    </h3>
                    <span className="whitespace-nowrap text-[13px] text-fg-muted">{school.period}</span>
                  </div>
                  <div className="text-[17px] text-fg">{school.degree}</div>
                  <div className="text-sm text-fg-muted">{school.meta}</div>

                  {school.affiliations && (
                    <div className="mt-[14px]">
                      <div className="mb-3 text-xs font-semibold uppercase tracking-[.08em] text-fg-muted">
                        Affiliations
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {school.affiliations.map((aff) => (
                          <span key={aff} className="rounded-full border border-border px-3.5 py-[7px] text-[13px] text-fg">
                            {aff}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {school.awards && (
                    <div className="mt-[18px]">
                      <div className="mb-3 text-xs font-semibold uppercase tracking-[.08em] text-fg-muted">
                        Awards &amp; Honors
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {school.awards.map((award) => (
                          <div key={award} className="flex items-baseline gap-2.5">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span className="text-[15px] text-fg">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-4 text-xs font-semibold uppercase tracking-[.08em] text-fg-muted">Coursework</div>
                  <div className="flex flex-col">
                    {school.coursework.map((course) => (
                      <div
                        key={course.name}
                        className="flex items-center justify-between gap-4 border-b border-border py-3"
                      >
                        <span className="text-[15px]">{course.name}</span>
                        <span className="whitespace-nowrap text-[13px] font-semibold text-lv-green">
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
      <section id="skills" className="border-t border-border px-12 py-[140px] max-[860px]:px-6">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeader title="Skills" index="04" />
          </Reveal>
          <Reveal className="mb-10 flex flex-wrap gap-7">
            <div className="flex items-center gap-2.5">
              <span className="h-[9px] w-[9px] rounded-full bg-lv-green" />
              <span className="text-[13px] text-fg-muted">Proficient · daily driver</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-[9px] w-[9px] rounded-full bg-lv-blue" />
              <span className="text-[13px] text-fg-muted">Working knowledge</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-[9px] w-[9px] rounded-full bg-lv-gray" />
              <span className="text-[13px] text-fg-muted">Basic familiarity</span>
            </div>
          </Reveal>

          <div className="flex flex-col">
            {skillGroups.map((group) => (
              <Reveal key={group.index} className="grid grid-cols-[220px_1fr] items-start gap-8 border-t border-border py-8 max-[860px]:grid-cols-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-[13px] font-semibold text-fg-muted">{group.index}</span>
                  <span className="text-[13px] font-semibold uppercase tracking-[.08em]">{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill.name}
                      className={`avp-skill avp-lv-${skill.level} rounded-full border px-4 py-[9px] text-sm`}
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
      <section id="work" className="border-t border-border px-12 py-[140px] max-[860px]:px-6">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeader
              title="Selected Work"
              index="05"
              right={
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[13px] font-semibold uppercase tracking-[.08em] text-fg-muted">Index — 05</span>
                  <ArrowLink href="/work" className="text-sm font-semibold">
                    View all work
                  </ArrowLink>
                </div>
              }
            />
          </Reveal>
          <div className="grid grid-cols-3 gap-6 max-[860px]:grid-cols-1">
            {projects.map((project) => (
              <Reveal key={project.index}>
                <ProjectCard project={project} variant="home" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section id="writing" className="border-t border-border px-12 py-[140px] max-[860px]:px-6">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <SectionHeader
              title="Writing"
              index="06"
              right={
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[13px] font-semibold uppercase tracking-[.08em] text-fg-muted">Index — 06</span>
                  <ArrowLink href="/writing" className="text-sm font-semibold">
                    View all writing
                  </ArrowLink>
                </div>
              }
            />
          </Reveal>
          <div className="flex flex-col">
            {posts.map((post) => (
              <Reveal key={post.title} className="flex items-center gap-6 border-t border-border py-7">
                <span className="w-[90px] shrink-0 text-[13px] text-fg-muted">{post.status}</span>
                <h3 className="m-0 flex-1 text-[clamp(18px,2.4vw,28px)] font-semibold tracking-[-0.01em]">{post.title}</h3>
                <span className="shrink-0 text-[13px] text-fg-muted">{post.topic}</span>
              </Reveal>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border px-12 pt-[140px] pb-[100px] max-[860px]:px-6">
        <Reveal className="mx-auto max-w-[1400px]">
          <Parallax speed={-0.04} className="block text-[13px] font-semibold uppercase tracking-[.08em] text-fg-muted">
            Index — 07
          </Parallax>
          <Parallax speed={-0.04} className="my-4 mb-12 text-[clamp(36px,5vw,64px)] font-bold tracking-[-0.02em]">
            Get in touch
          </Parallax>
          <Parallax speed={-0.05} className="mb-14 w-fit">
            <a
              href={`mailto:${email}`}
              className="avp-link-arrow flex w-fit items-center gap-4 text-[clamp(28px,6vw,64px)] font-bold tracking-[-0.02em]"
            >
              {email} <span className="avp-arrow text-[0.6em]">↗</span>
            </a>
          </Parallax>
          <div className="flex flex-wrap gap-10 border-t border-border pt-8">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener"
                className="avp-social text-sm font-semibold"
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
