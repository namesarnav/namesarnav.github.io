import Image from "next/image";
import Link from "next/link";

import { Parallax } from "@/components/parallax";
import { NewsLine } from "@/components/news-line";
import { Button } from "@/components/ui/button";
import { getHero, getNews } from "@/lib/content";

export function HeroSection() {
  const hero = getHero();
  const news = getNews();

  return (
    <section className="mx-auto w-full max-w-[1040px] px-6 pt-24 pb-24 sm:pt-36 sm:pb-32">
      {/*
        The portrait sits beside the text on wide screens and above it on
        narrow ones. `flex-col-reverse` puts the photo first in reading order
        on mobile while keeping the name first in the DOM, so the heading is
        still the first thing a screen reader reaches.
      */}
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
        {/*
          The two columns drift at slightly different rates as the page scrolls:
          the portrait hangs back further than the text, so the hero separates
          into two planes. Both numbers are small on purpose.
        */}
        <Parallax speed={0.09} className="min-w-0 flex-1">
          <h1 className="font-heading text-[45px] font-normal leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[65px]">
            {hero.name}
          </h1>

          <p className="mt-3 text-[21px] leading-[1.4] text-muted-foreground sm:text-[26px]">
            {hero.title}
          </p>

          {hero.tagline ? (
            <p className="mt-7 max-w-[58ch] text-[18px] leading-[1.65] text-foreground/85">
              {hero.tagline}
            </p>
          ) : null}

          {hero.location ? (
            <p className="mt-5 text-[16px] text-muted-foreground">{hero.location}</p>
          ) : null}

          {news.items.length > 0 ? (
            <NewsLine label={news.label} items={news.items} interval={news.interval} />
          ) : null}

          {hero.badges.length > 0 ? (
            <ul className="mt-6 flex flex-wrap items-center gap-2">
              {hero.badges.map((badge) => {
                const chip = (
                  <>
                    {/*
                      The badge art is a transparent square, so it gets no frame
                      of its own — object-contain keeps a wide or tall logo from
                      being cropped into the box.
                    */}
                    <Image
                      src={badge.image}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7 shrink-0 object-contain"
                    />
                    <span>{badge.label}</span>
                  </>
                );

                return (
                  <li key={`${badge.label}-${badge.image}`}>
                    {badge.href ? (
                      <Link
                        href={badge.href}
                        className="flex items-center gap-2 rounded-md border border-rule bg-surface py-1.5 pr-3 pl-1.5 text-[15px] leading-[1.3] text-foreground/85 transition-colors hover:bg-surface-hover"
                      >
                        {chip}
                      </Link>
                    ) : (
                      <span className="flex items-center gap-2 rounded-md border border-rule bg-surface py-1.5 pr-3 pl-1.5 text-[15px] leading-[1.3] text-foreground/85">
                        {chip}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}

          {hero.actions.length > 0 ? (
            <div className="mt-9 flex flex-wrap items-center gap-2.5">
              {hero.actions.map((action) => (
                <Button
                  key={`${action.label}-${action.href}`}
                  render={<Link href={action.href} />}
                  variant={action.variant === "primary" ? "default" : "outline"}
                  size="lg"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </Parallax>

        {hero.photo ? (
          <Parallax speed={0.24} className="relative size-[132px] shrink-0 overflow-hidden rounded-xl border border-rule bg-surface shadow-(--shadow-soft) sm:size-[172px]">
            <Image
              src={hero.photo}
              alt={hero.photo_alt ?? hero.name}
              fill
              // Never larger than the rendered box, so the browser can skip the
              // full-resolution file on small screens.
              sizes="172px"
              className="object-cover"
              priority
            />
          </Parallax>
        ) : null}
      </div>
    </section>
  );
}
