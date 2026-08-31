"use client";

import { useEffect, useRef, useState } from "react";

import { songNameFromSrc } from "@/lib/song-name";
import { cn } from "@/lib/utils";

export type VibeConfig = {
  src?: string;
  title?: string;
  label?: string;
  playing_label?: string;
  loop: boolean;
  volume: number;
};

/** Bar heights and beat lengths, so the waveform is uneven the way a real one is. */
const BARS = [
  { height: 7, beat: "0.72s", delay: "0s" },
  { height: 13, beat: "0.58s", delay: "0.09s" },
  { height: 10, beat: "0.86s", delay: "0.04s" },
  { height: 15, beat: "0.64s", delay: "0.16s" },
  { height: 8, beat: "0.78s", delay: "0.11s" },
];

/** Notes drift out of the top of the button while the track runs. */
const NOTES = [
  { glyph: "♪", left: "16%", drift: "-14px", spin: "-18deg", delay: "0s", size: 13 },
  { glyph: "♫", left: "48%", drift: "10px", spin: "16deg", delay: "0.55s", size: 15 },
  { glyph: "♬", left: "72%", drift: "-6px", spin: "-10deg", delay: "1.1s", size: 12 },
  { glyph: "♩", left: "33%", drift: "16px", spin: "22deg", delay: "1.45s", size: 11 },
];

export function VibeButton({ vibe }: { vibe: VibeConfig }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = vibe.volume;
  }, [vibe.volume]);

  if (!vibe.src) return null;

  const label = vibe.label ?? "Click here to vibe";
  const playingLabel = vibe.playing_label ?? "Vibing";
  // The track's name, taken from its filename unless the YAML overrides it.
  const song = vibe.title ?? songNameFromSrc(vibe.src);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      // A missing file or a browser that refuses to play leaves the button
      // sitting quietly in its idle state rather than lying about it.
      setPlaying(false);
    }
  };

  return (
    <div className="relative">
      {/* Notes fall out of the bottom: the button sits hard against the top of
          the viewport, so anything drifting upward would be clipped away. */}
      {playing ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-full h-10 overflow-visible"
        >
          {NOTES.map((note) => (
            <span
              key={note.glyph + note.delay}
              className="vibe-note absolute top-0 leading-none text-foreground/70"
              style={
                {
                  left: note.left,
                  fontSize: note.size,
                  animationDelay: note.delay,
                  "--drift": note.drift,
                  "--spin": note.spin,
                } as React.CSSProperties
              }
            >
              {note.glyph}
            </span>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={toggle}
        data-playing={playing}
        aria-pressed={playing}
        aria-label={
          playing
            ? `${playingLabel}${song ? `: ${song}` : ""} — tap to stop`
            : label
        }
        className={cn(
          "group relative flex h-8 items-center gap-2 rounded-md border px-2.5 text-[13px] font-medium transition-colors",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none",
          playing
            ? "border-transparent bg-primary text-primary-foreground"
            : "border-border bg-background text-foreground hover:bg-surface-hover",
        )}
      >
        <span aria-hidden className="flex h-4 items-end gap-[2px]">
          {BARS.map((bar, index) => (
            <span
              key={index}
              className={cn(
                "vibe-bar w-[2px] rounded-full",
                playing ? "bg-primary-foreground" : "bg-muted-foreground",
              )}
              style={
                {
                  height: bar.height,
                  animationDelay: bar.delay,
                  "--beat": bar.beat,
                } as React.CSSProperties
              }
            />
          ))}
        </span>

        <span className="hidden whitespace-nowrap sm:inline">
          {playing ? playingLabel : label}
        </span>
      </button>

      {playing && song ? (
        <p className="pointer-events-none absolute top-full right-0 z-10 mt-1.5 max-w-[220px] truncate text-right text-[11px] font-light tracking-wide text-muted-foreground">
          {song}
        </p>
      ) : null}

      <audio
        ref={audioRef}
        src={vibe.src}
        loop={vibe.loop}
        preload="none"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
      />
    </div>
  );
}
