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
      className="sticky top-0 z-40 border-b-2 border-white/10 backdrop-blur-xl bg-gradient-to-r from-slate-900/90 via-purple-900/90 to-slate-900/90"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/30 transition-transform group-hover:rotate-12">
            <span className="text-xl">✨</span>
          </div>
          <div className="flex items-center gap-2">
            <InstagramLogo className="h-5 w-5 text-pink-500" />
            <YouTubeLogo className="h-5 w-5 text-red-500" />
            <TikTokLogo className="h-5 w-5 text-cyan-500" />
          </div>
          <p className="text-sm font-bold tracking-tight text-white group-hover:text-pink-400 transition-colors">
            SkeTools Growth OS
          </p>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="boxy-btn group relative overflow-hidden rounded-xl border-2 border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/10 hover:border-white/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                {item.icon} {item.label}
              </span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-500/0 via-purple-500/0 to-cyan-500/0 transition-all group-hover:from-pink-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20"></div>
            </Link>
          ))}
          <ThemeToggle />
          <SignOutButton />
        </nav>
      </div>
    </header>
  );
}
