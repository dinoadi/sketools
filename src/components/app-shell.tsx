import type { ReactNode } from "react";

import { DashboardNav } from "@/components/dashboard-nav";

type AppShellProps = {
  title: ReactNode;
  description?: string;
  children: ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" style={{ color: "var(--foreground)" }}>
      <DashboardNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-8 sm:py-10">
        <header className="relative overflow-hidden rounded-3xl border-2 border-white/10 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          <div className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/10 blur-2xl"></div>
          <div className="absolute -left-10 -bottom-10 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-2xl"></div>
          
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
              Growth Command Center
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-white">{title}</h1>
            {description ? (
              <p className="mt-2 max-w-3xl text-sm leading-6 sm:text-base text-white/70">
                {description}
              </p>
            ) : null}
          </div>
        </header>

        <section className="space-y-4">{children}</section>

        <footer
          className="mt-10 rounded-2xl border-2 border-white/10 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 px-5 py-4 text-xs sm:text-sm backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-4 text-white/60">
            <span>🚀 Built for velocity</span>
            <span className="text-white/30">•</span>
            <span>⚡ Crafted for conversion</span>
            <span className="text-white/30">•</span>
            <span>🎯 Designed for teams that ship every day</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

