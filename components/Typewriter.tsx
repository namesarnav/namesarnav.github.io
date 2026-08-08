"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  phrases: string[];
}

type Mode = "typing" | "pausing" | "deleting";

export default function Typewriter({ phrases }: TypewriterProps) {
  const [typedText, setTypedText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    let phraseIndex = 0;
    let charLen = 0;
    let mode: Mode = "typing";

    const run = () => {
      const phrase = phrases[phraseIndex];
      let delay = 55;

      if (mode === "typing") {
        charLen += 1;
        if (charLen >= phrase.length) {
          mode = "pausing";
          delay = 1400;
        }
      } else if (mode === "pausing") {
        mode = "deleting";
        delay = 300;
      } else {
        charLen -= 1;
        delay = 30;
        if (charLen <= 0) {
          mode = "typing";
          phraseIndex = (phraseIndex + 1) % phrases.length;
          charLen = 0;
          delay = 300;
        }
      }

      setTypedText(phrase.slice(0, Math.max(charLen, 0)));
      timerRef.current = setTimeout(run, delay);
    };

    run();
    return () => clearTimeout(timerRef.current);
  }, [phrases]);

  return (
    <span className="text-[13px] font-semibold uppercase tracking-[.08em] text-fg-muted">
      {typedText}
      <span className="avp-cursor" />
    </span>
  );
}
