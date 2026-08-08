import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  external?: boolean;
  download?: boolean;
  arrowStyle?: CSSProperties;
  underline?: boolean;
}

export default function ArrowLink({
  href,
  children,
  className = "",
  style,
  external = false,
  download = false,
  arrowStyle,
  underline = false,
}: ArrowLinkProps) {
  const classes = `avp-link-arrow ${underline ? "avp-navlink" : ""} inline-flex items-center gap-1.5 ${className}`.trim();
  const content = (
    <>
      {children} <span className="avp-arrow" style={arrowStyle}>↗</span>
    </>
  );

  if (download) {
    return (
      <a href={href} download className={classes} style={style}>
        {content}
      </a>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes} style={style}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} style={style}>
      {content}
    </Link>
  );
}
