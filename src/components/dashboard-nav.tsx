import Link from "next/link";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/dashboard", label: "📊 Dashboard" },
  { href: "/tools", label: "🧰 Tools" },
  { href: "/connected-accounts", label: "🔗 Accounts" },
  { href: "/settings", label: "⚙️ Settings" },
];

export function DashboardNav() {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          ✨ SkeTools Growth OS
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="interactive-btn rounded-full border px-3 py-2 text-xs font-semibold sm:text-sm"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface-strong)",
                color: "var(--foreground)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <SignOutButton />
        </nav>
      </div>
    </header>
  );
}
