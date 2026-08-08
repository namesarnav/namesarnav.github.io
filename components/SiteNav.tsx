"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/work", label: "Work", key: "work" },
  { href: "/writing", label: "Writing", key: "writing" },
  { href: "/#about", label: "About", key: "about" },
  { href: "/#contact", label: "Contact", key: "contact" },
];

interface SiteNavProps {
  active: "work" | "writing";
}

export default function SiteNav({ active }: SiteNavProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-12 py-[18px] max-[860px]:px-6"
        style={{
          background: "var(--color-glass-bg)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--color-glass-border)",
        }}
      >
        <Link href="/#hero" className="text-lg font-bold tracking-[-0.02em]">
          ARNAV VERMA
        </Link>
        <div className="hidden items-center gap-10 min-[861px]:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="avp-navlink text-sm font-medium"
              style={{ color: active === link.key ? "var(--color-accent)" : undefined }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setNavOpen((v) => !v)}
          className="avp-btn flex h-9 w-9 items-center justify-center rounded-full border border-border bg-transparent text-fg min-[861px]:hidden"
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
            <Link key={link.key} href={link.href} className="text-4xl font-bold">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
