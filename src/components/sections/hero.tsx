import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getHero } from "@/lib/content";

export function HeroSection() {
  const hero = getHero();

  return (
    <section className="mx-auto w-full max-w-[900px] px-6 pt-24 pb-24 sm:pt-36 sm:pb-32">
      {/*
        The portrait sits beside the text on wide screens and above it on
        narrow ones. `flex-col-reverse` puts the photo first in reading order
        on mobile while keeping the name first in the DOM, so the heading is
        still the first thing a screen reader reaches.
      */}
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
        <div className="min-w-0 flex-1">
          <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-[58px]">
            {hero.name}
          </h1>

          <p className="mt-3 text-[18px] leading-[1.4] tracking-[-0.01em] text-muted-foreground sm:text-[21px]">
            {hero.title}
          </p>

          {hero.tagline ? (
            <p className="mt-7 max-w-[58ch] text-[16px] leading-[1.65] text-foreground/85">
              {hero.tagline}
            </p>
          ) : null}

          {hero.location ? (
            <p className="mt-5 text-[14px] text-muted-foreground">{hero.location}</p>
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
        </div>

        {hero.photo ? (
          <div className="relative size-[132px] shrink-0 overflow-hidden rounded-xl border border-rule bg-surface shadow-(--shadow-soft) sm:size-[172px]">
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
          </div>
        ) : null}
      </div>
    </section>
  );
}
