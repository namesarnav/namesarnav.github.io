import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  download?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function Button({ href, children, variant = "solid", download = false, className = "", style }: ButtonProps) {
  const base = "avp-btn inline-block rounded-full px-8 py-4 text-base font-semibold";
  const variantClass =
    variant === "solid" ? "bg-fg text-bg" : "bg-transparent text-fg border border-fg";
  const classes = `${base} ${variantClass} ${className}`.trim();

  if (download) {
    return (
      <a href={href} download className={classes} style={style}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={style}>
      {children}
    </Link>
  );
}
