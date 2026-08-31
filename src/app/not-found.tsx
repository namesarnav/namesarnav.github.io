import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getSite } from "@/lib/content";

export default function NotFound() {
  const site = getSite();
  const copy = site.not_found;

  const code = copy.code ?? "404";
  const links = copy.links ?? site.nav;

  return (
    <main className="mx-auto flex w-full max-w-[900px] flex-col items-center px-6 pt-28 pb-32 text-center sm:pt-40">
      {/*
        Each digit drifts on its own slow cycle, offset so they never line up
        and the group never reads as a single bouncing block. The delays are
        negative, so the motion is already underway on the first frame instead
        of starting from a dead stop.
      */}
      <p
        aria-hidden
        className="flex items-end gap-1 text-[84px] font-semibold leading-none tracking-[-0.04em] text-foreground/10 sm:gap-2 sm:text-[128px]"
      >
        {code.split("").map((character, index) => (
          <span
            key={index}
            className="notfound-digit"
            style={{ "--delay": `${-index * 1.1}s` } as React.CSSProperties}
          >
            {character}
          </span>
        ))}
      </p>

      <h1 className="notfound-rise mt-8 text-[26px] font-semibold tracking-[-0.02em] text-foreground sm:text-[32px]">
        {copy.heading ?? "This page wandered off"}
        {/* A caret, as though the sentence is still being typed. */}
        <span aria-hidden className="notfound-caret" />
      </h1>

      {copy.message ? (
        <p
          className="notfound-rise mt-4 max-w-[46ch] text-[16px] leading-[1.65] text-muted-foreground"
          style={{ "--delay": "0.08s" } as React.CSSProperties}
        >
          {copy.message}
        </p>
      ) : null}

      <div
        className="notfound-rise mt-9"
        style={{ "--delay": "0.16s" } as React.CSSProperties}
      >
        <Button render={<Link href="/" />} size="lg">
          <ArrowLeft data-icon="inline-start" />
          {copy.home_label ?? "Back to the homepage"}
        </Button>
      </div>

      {links.length > 0 ? (
        <nav
          className="notfound-rise mt-12 border-t border-rule pt-8"
          style={{ "--delay": "0.24s" } as React.CSSProperties}
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${link.href}`}
                  className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </main>
  );
}
