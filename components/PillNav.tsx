"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function PillNav() {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

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
        className="avp-pillnav fixed top-[22px] left-1/2 z-[100] flex items-center gap-1 rounded-full border p-[7px] shadow-[0_22px_48px_-24px_rgba(0,0,0,0.9)]"
        style={{
          background: "rgba(18,18,18,.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "rgba(244,243,239,.1)",
        }}
      >
        <span
          ref={indicatorRef}
          className="pointer-events-none absolute left-0 top-[7px] h-[38px] w-0 rounded-full opacity-0 transition-[transform,width] duration-[.38s] ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ background: "rgba(244,243,239,.09)", transitionProperty: "transform, width, opacity" }}
        />
        <Link
          href="#hero"
          aria-label="Home"
          className="avp-monogram relative z-[1] flex h-[38px] w-[38px] items-center justify-center rounded-full bg-fg text-[13px] font-bold tracking-[-0.02em] text-[#0c0c0c]"
        >
          AV
        </Link>
        <div className="hidden items-center gap-0.5 min-[861px]:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={moveIndicator}
              className="avp-pilllink relative z-[1] rounded-full px-[18px] py-2.5 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/Arnav-Verma-CV.pdf"
            download
            onMouseEnter={moveIndicator}
            className="avp-copybtn relative z-[1] ml-1.5 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-[#0c0c0c]"
          >
            CV
          </a>
        </div>
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setNavOpen((v) => !v)}
          className="relative z-[1] flex h-[38px] w-[38px] items-center justify-center rounded-full text-fg min-[861px]:hidden"
          style={{ background: "rgba(244,243,239,.09)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </nav>

      {navOpen && (
        <div
          className="fixed inset-0 z-[90] flex flex-col items-start justify-center gap-7 bg-bg p-12"
          onClick={() => setNavOpen(false)}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-4xl font-bold">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
