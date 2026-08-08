import Link from "next/link";

interface FooterProps {
  variant?: "home" | "sub";
}

export default function Footer({ variant = "home" }: FooterProps) {
  const href = variant === "home" ? "#hero" : "/#hero";
  const label = variant === "home" ? "Back to top ↑" : "← Back home";

  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-12 py-8 max-[860px]:px-6">
      <span className="text-[13px] text-fg-muted">© 2026 Arnav Verma</span>
      <Link href={href} className="text-[13px] font-semibold text-fg-muted">
        {label}
      </Link>
    </footer>
  );
}
