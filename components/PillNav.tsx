"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import ThemeTogglerButton from "@/components/ThemeTogglerButton";

const links = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

interface PillNavProps {
  /** true on the homepage (in-page anchors); false on /work, /writing (cross-page anchors to "/#…") */
  home?: boolean;
}

export default function PillNav({ home = true }: PillNavProps) {
  const [navOpen, setNavOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const navRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  const prefix = home ? "" : "/";

  // Scroll-spy: highlight the nav link for whichever section is centered in
  // the viewport. Only meaningful on the homepage, where these ids exist.
  useEffect(() => {
    if (!home) return;
    const sections = ["hero", ...links.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [home]);

  const moveIndicator = (event: MouseEvent<HTMLAnchorElement>) => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;
    const navRect = nav.getBoundingClientRect();
    const rect = event.currentTarget.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - navRect.left}px)`;
    indicator.style.opacity = "1";
  };

  const hideIndicator = () => {
    if (indicatorRef.current) indicatorRef.current.style.opacity = "0";
  };

  return (
    <>
      <nav
        ref={navRef}
        onMouseLeave={hideIndicator}
        className="avp-pillnav fixed top-6 left-1/2 z-[100] flex items-center gap-1 rounded-full border p-2 shadow-[0_22px_48px_-24px_rgba(0,0,0,0.9)]"
        style={{
          background: "var(--av-nav-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "var(--av-nav-border)",
        }}
      >
        <span
          ref={indicatorRef}
          className="pointer-events-none absolute left-0 top-2 h-11 w-0 rounded-full opacity-0 transition-[transform,width] duration-[.38s] ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ background: "var(--av-pill-hover)", transitionProperty: "transform, width, opacity" }}
        />
        <Link
          href={`${prefix}#hero`}
          aria-label="Home"
          className="avp-monogram relative z-[1] flex h-11 w-11 items-center justify-center rounded-full bg-fg text-sm font-bold tracking-[-0.02em] text-bg"
        >
          AV
        </Link>
        <div className="hidden items-center gap-0.5 min-[861px]:flex">
          {links.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <Link
                key={link.href}
                href={`${prefix}${link.href}`}
                onMouseEnter={moveIndicator}
                aria-current={isActive ? "true" : undefined}
                className={`avp-pilllink relative z-[1] rounded-full px-5 py-3 text-[15px] font-medium ${isActive ? "text-fg" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="/Arnav-Verma-CV.pdf"
            download
            onMouseEnter={moveIndicator}
            className="avp-copybtn relative z-[1] ml-2 rounded-full bg-fg px-6 py-3 text-[15px] font-semibold text-bg"
          >
            CV
          </a>
          <ThemeTogglerButton className="ml-1" />
        </div>
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setNavOpen((v) => !v)}
          className="relative z-[1] flex h-11 w-11 items-center justify-center rounded-full text-fg min-[861px]:hidden"
          style={{ background: "var(--av-pill-hover)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {navOpen && (
        <div
          className="fixed inset-0 z-[90] flex flex-col items-start justify-center gap-7 bg-bg p-12"
          onClick={() => setNavOpen(false)}
        >
          {links.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <Link
                key={link.href}
                href={`${prefix}${link.href}`}
                aria-current={isActive ? "true" : undefined}
                className={`text-4xl font-bold ${isActive ? "text-accent" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeTogglerButton className="mt-4" />
        </div>
      )}
    </>
  );
}
