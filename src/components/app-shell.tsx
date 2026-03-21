import type { ReactNode } from "react";

import { DashboardNav } from "@/components/dashboard-nav";

type AppShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
  return (
    <div className="gradient-hero min-h-screen" style={{ color: "var(--foreground)" }}>
      <DashboardNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-8 sm:py-10">
        <header className="glass mb-8 rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            Growth Command Center
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm leading-6 sm:text-base" style={{ color: "var(--muted)" }}>
              {description}
            </p>
          ) : null}
        </header>

        <section className="space-y-4">{children}</section>

        <footer
          className="mt-10 rounded-2xl border px-5 py-4 text-xs sm:text-sm"
          style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted)" }}
        >
          🚀 Built for velocity • ⚡ Crafted for conversion • 🎯 Designed for teams that ship every day.
        </footer>
      </main>
    </div>
  );
}

