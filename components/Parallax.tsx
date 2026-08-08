"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

interface ParallaxProps {
  speed: number;
  fixed?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export default function Parallax({ speed, fixed = false, className, style, children }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const docTop = el.getBoundingClientRect().top + window.scrollY;
    let rafPending = false;

    const apply = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const raw = fixed ? y * speed : (docTop - y - vh / 2) * speed;
      const limit = fixed ? 70 : 30;
      el.style.transform = `translateY(${Math.max(-limit, Math.min(limit, raw))}px)`;
      rafPending = false;
    };

    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();

    return () => window.removeEventListener("scroll", onScroll);
  }, [speed, fixed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform", ...style }}>
      {children}
    </div>
  );
}
