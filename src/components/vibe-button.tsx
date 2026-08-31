"use client";

import { SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { parseTrackName } from "@/lib/track-name";
import { cn } from "@/lib/utils";

export type VibeTrack = { src: string; title?: string; artist?: string };

export type VibeConfig = {
  tracks: VibeTrack[];
  label?: string;
  playing_label?: string;
  loop: boolean;
  shuffle: boolean;
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

/** Notes drift out of the bottom of the button while a track runs. */
const NOTES = [
  { glyph: "♪", left: "16%", drift: "-14px", spin: "-18deg", delay: "0s", size: 13 },
  { glyph: "♫", left: "48%", drift: "10px", spin: "16deg", delay: "0.55s", size: 15 },
  { glyph: "♬", left: "72%", drift: "-6px", spin: "-10deg", delay: "1.1s", size: 12 },
  { glyph: "♩", left: "33%", drift: "16px", spin: "22deg", delay: "1.45s", size: 11 },
];

function shuffled(length: number) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

export function VibeButton({ vibe }: { vibe: VibeConfig }) {
  const { tracks } = vibe;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  // The order to play in, and where we are within it.
  const [order, setOrder] = useState<number[]>(() => tracks.map((_, i) => i));
  const [position, setPosition] = useState(0);
  // Swapping the element's src pauses it, which would otherwise look like the
  // listener hitting stop. This marks the pause events we caused ourselves.
  const switchingTrack = useRef(false);

  const track = tracks[order[position]];

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = vibe.volume;
  }, [vibe.volume]);

  // Whenever the track or the play state changes, make the element agree.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playing) return;
    audio
      .play()
      .then(() => {
        switchingTrack.current = false;
      })
      .catch(() => {
        switchingTrack.current = false;
        setPlaying(false);
      });
  }, [playing, position, order]);

  if (tracks.length === 0 || !track) return null;

  const label = vibe.label ?? "Click here to vibe";
  const playingLabel = vibe.playing_label ?? "Vibing";
  const name = track.title
    ? { title: track.title, artist: track.artist }
    : { ...parseTrackName(track.src), artist: track.artist ?? parseTrackName(track.src)?.artist };

  const advance = (manual: boolean) => {
    switchingTrack.current = true;
    const next = position + 1;
    if (next < order.length) {
      setPosition(next);
      return;
    }
    if (vibe.loop || manual) {
      setPosition(0);
      return;
    }
    // End of the playlist, and not looping.
    switchingTrack.current = false;
    setPlaying(false);
    setPosition(0);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    // Shuffling on the click, not during render, keeps the server and the
    // client agreeing on what to draw.
    if (vibe.shuffle && tracks.length > 1) {
      setOrder(shuffled(tracks.length));
      setPosition(0);
    }
    setPlaying(true);
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

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggle}
          data-playing={playing}
          aria-pressed={playing}
          aria-label={
            playing
              ? `${playingLabel}: ${name.title}${name.artist ? ` by ${name.artist}` : ""} — tap to stop`
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
                  { height: bar.height, animationDelay: bar.delay, "--beat": bar.beat } as React.CSSProperties
                }
              />
            ))}
          </span>

          <span className="hidden whitespace-nowrap sm:inline">
            {playing ? playingLabel : label}
          </span>
        </button>

        {playing && tracks.length > 1 ? (
          <button
            type="button"
            onClick={() => advance(true)}
            aria-label="Next track"
            className="flex size-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors outline-none hover:bg-surface-hover hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <SkipForward className="size-3.5" />
          </button>
        ) : null}
      </div>

      {playing && name.title ? (
        <div className="pointer-events-none absolute top-full right-0 z-10 mt-1.5 max-w-[220px] text-right">
          <p className="truncate text-[11px] font-light tracking-wide text-muted-foreground">
            {name.title}
          </p>
          {name.artist ? (
            <p className="truncate text-[10px] font-light tracking-wide text-muted-foreground/70">
              {name.artist}
            </p>
          ) : null}
        </div>
      ) : null}

      <audio
        ref={audioRef}
        src={track.src}
        loop={tracks.length === 1 && vibe.loop}
        preload="none"
        onEnded={() => advance(false)}
        onPause={() => {
          if (switchingTrack.current) return;
          setPlaying(false);
        }}
      />
    </div>
  );
}
