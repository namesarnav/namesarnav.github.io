import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getHero } from "@/lib/content";

export function HeroSection() {
  const hero = getHero();

  return (
    <section className="mx-auto w-full max-w-[900px] px-6 pt-24 pb-24 sm:pt-36 sm:pb-32">
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
    </section>
  );
}
