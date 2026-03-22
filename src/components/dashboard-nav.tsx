import Link from "next/link";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { InstagramLogo } from "@/components/logos/instagram-logo";
import { YouTubeLogo } from "@/components/logos/youtube-logo";
import { TikTokLogo } from "@/components/logos/tiktok-logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/tools", label: "Tools", icon: "🧰" },
  { href: "/connected-accounts", label: "Accounts", icon: "🔗" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export function DashboardNav() {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          <div className="flex items-center gap-1">
            <InstagramLogo className="h-5 w-5 text-pink-500" />
            <YouTubeLogo className="h-5 w-5 text-red-500" />
            <TikTokLogo className="h-5 w-5 text-cyan-500" />
          </div>
          <span>SkeTools Growth OS</span>
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
              {item.icon} {item.label}
            </Link>
          ))}
          <ThemeToggle />
          <SignOutButton />
        </nav>
      </div>
    </header>
  );
}
