"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Inertial scrolling for the whole document. Lenis still scrolls the real page
 * — it only eases how fast `scrollY` catches up to the wheel — so the sticky
 * header, anchor links and the hero parallax all keep working off it unchanged.
 *
 * Renders nothing; it exists for the effect.
 */
export function SmoothScroll() {
  useEffect(() => {
    /*
      Easing the page is motion the reader did not ask for, so with
      reduce-motion set the browser's own scrolling is left alone entirely.
    */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      /* Short enough to still feel like a direct response to the wheel. */
      duration: 0.9,
      /* Touch screens have their own momentum; a second one fights the first. */
      syncTouch: false,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
