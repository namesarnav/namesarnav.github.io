import type { ReactNode } from "react";
import Parallax from "@/components/Parallax";

interface SectionHeaderProps {
  title: string;
  index: string;
  right?: ReactNode;
}

export default function SectionHeader({ title, index, right }: SectionHeaderProps) {
  return (
    <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
      <Parallax speed={-0.04}>
        <h2 className="m-0 text-[clamp(44px,6.5vw,84px)] font-bold tracking-[-0.02em]">{title}</h2>
      </Parallax>
      {right ?? (
        <Parallax speed={-0.04} className="text-sm font-semibold uppercase tracking-[.08em] text-fg-muted">
          Index — {index}
        </Parallax>
      )}
    </div>
  );
}
