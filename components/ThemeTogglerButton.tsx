"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

type Mode = "light" | "dark" | "system";
type Direction = "ltr" | "rtl" | "ttb" | "btt";

interface ThemeTogglerButtonProps {
  /** Theme names to cycle through on click. Default: ["light", "dark"] */
  modes?: Mode[];
  /** Which edge the new theme wipes in from. Default: "ltr" */
  direction?: Direction;
  /** Fires with the next theme the instant the click is handled, before the wipe animation runs */
  onImmediateChange?: (theme: Mode) => void;
  className?: string;
}

const clipPaths: Record<Direction, [string, string]> = {
  ltr: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  rtl: ["inset(0 0 0 100%)", "inset(0 0 0 0%)"],
  ttb: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
  btt: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
};

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

export default function ThemeTogglerButton({
  modes = ["light", "dark"],
  direction = "ltr",
  onImmediateChange,
  className = "",
}: ThemeTogglerButtonProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // Standard next-themes pattern: the resolved theme is unknown on the server,
  // so gate the icon on mount to avoid a hydration mismatch.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    const current = (resolvedTheme as Mode) ?? "dark";
    const currentIndex = modes.indexOf(current);
    const next = modes[(currentIndex + 1) % modes.length] ?? (current === "dark" ? "light" : "dark");
    onImmediateChange?.(next);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!buttonRef.current || reduceMotion || !document.startViewTransition) {
      setTheme(next);
      return;
    }

    const [from, to] = clipPaths[direction];
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [from, to] },
        { duration: 550, easing: "cubic-bezier(.16,1,.3,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`relative z-[1] flex h-11 w-11 items-center justify-center rounded-full text-fg transition-transform duration-300 hover:scale-105 active:scale-95 ${className}`}
      style={{ background: "var(--av-pill-hover)" }}
    >
      {mounted && resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
