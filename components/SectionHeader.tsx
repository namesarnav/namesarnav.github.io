import type { ReactNode } from "react";
import Parallax from "@/components/Parallax";

interface SectionHeaderProps {
  title: string;
  index: string;
  right?: ReactNode;
}

export default function SectionHeader({ title, index, right }: SectionHeaderProps) {
  return (
    <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
      <Parallax speed={-0.04}>
        <h2 className="m-0 text-[clamp(36px,5vw,64px)] font-bold tracking-[-0.02em]">{title}</h2>
      </Parallax>
      {right ?? (
        <Parallax speed={-0.04} className="text-[13px] font-semibold uppercase tracking-[.08em] text-fg-muted">
          Index — {index}
        </Parallax>
      )}
    </div>
  );
}
