"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

function NoteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function EqIcon() {
  const bars = [
    { h: 8, delay: "0s" },
    { h: 14, delay: "0.15s" },
    { h: 10, delay: "0.3s" },
  ];
  return (
    <div className="flex h-5 items-end gap-[3px]">
      {bars.map((bar, i) => (
        <span
          key={i}
          className="avp-eq-bar w-[3px] rounded-full bg-current"
          style={{ height: `${bar.h}px`, animationDelay: bar.delay }}
        />
      ))}
    </div>
  );
}

export default function VibeButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio?.pause();
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -20, ry: px * 20 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div className="fixed top-6 right-6 z-[100] flex items-center gap-3">
      <span className="hidden text-xs font-semibold uppercase tracking-[.08em] text-fg-muted min-[1100px]:inline">
        Click me to vibe
      </span>
      <button
        ref={buttonRef}
        type="button"
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
        onClick={toggle}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className="relative flex h-12 w-12 items-center justify-center rounded-full text-fg transition-transform duration-150 will-change-transform active:scale-90"
        style={{
          transform: `perspective(400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          background: "linear-gradient(145deg, var(--color-bg-alt), var(--color-bg))",
          boxShadow: playing
            ? "0 0 0 1px var(--color-border), 0 10px 24px -8px rgba(255,81,71,.5), inset 0 1px 0 rgba(255,255,255,.08)"
            : "0 0 0 1px var(--color-border), 0 10px 20px -10px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.06)",
        }}
      >
        {playing ? <EqIcon /> : <NoteIcon />}
        {playing && <span className="avp-vibe-dot absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent" />}
      </button>
      <audio ref={audioRef} src="/vibe.mp3" loop preload="none" onEnded={() => setPlaying(false)} />
    </div>
  );
}
