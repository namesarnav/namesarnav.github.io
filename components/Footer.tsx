import Link from "next/link";

interface FooterProps {
  variant?: "home" | "sub";
}

export default function Footer({ variant = "home" }: FooterProps) {
  const href = variant === "home" ? "#hero" : "/#hero";
  const label = variant === "home" ? "Back to top ↑" : "← Back home";

  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-16 py-10 max-[860px]:px-8">
      <span className="text-sm text-fg-muted">© 2026 Arnav Verma</span>
      <Link href={href} className="text-sm font-semibold text-fg-muted">
        {label}
      </Link>
    </footer>
  );
}
