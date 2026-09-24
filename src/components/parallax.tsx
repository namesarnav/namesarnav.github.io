"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * A single element that drifts as the page scrolls. `speed` is the fraction of
 * the scroll distance it lags behind by — 0.1 means it has moved 10px by the
 * time the page has moved 100, which reads as depth rather than as movement.
 *
 * Only ever used near the top of the page, so window.scrollY is the offset;
 * there is no per-element measurement and so nothing that forces layout.
 */
export function Parallax({
  speed = 0.08,
  className,
  children,
}: {
  speed?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /*
      Motion for its own sake, so it is the whole effect that goes when the
      reader has asked for less of it — not a shortened version of it.
    */
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let frame = 0;

    const paint = () => {
      frame = 0;
      el.style.transform = `translate3d(0, ${(window.scrollY * speed).toFixed(2)}px, 0)`;
    };

    // Scroll fires far faster than the screen repaints; one frame is enough.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
