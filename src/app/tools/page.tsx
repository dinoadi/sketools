import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { requireServerSession } from "@/lib/auth/require-session";

const tools = [
  {
    title: "⚡ Instagram Reels Downloader",
    description: "Unduh konten reels dari single URL atau discovery massal dengan preview seleksi super cepat.",
    href: "/downloader",
    tag: "Downloader",
  },
  {
    title: "📺 YouTube Scheduler",
    description: "Jadwalkan upload YouTube berbasis URL, upload lokal, atau path VPS dengan flow yang presisi.",
    href: "/scheduler-center",
    tag: "Scheduler",
  },
  {
    title: "🎵 TikTok Scheduler",
    description: "Kelola antrean posting TikTok dengan retry policy otomatis agar campaign tetap on-track.",
    href: "/scheduler-center",
    tag: "Scheduler",
  },
  {
    title: "👀 TikTok Viewer",
    description: "Akses konten TikTok publik tanpa login dengan cache cerdas dan rate limit aman.",
    href: "/tiktok-viewer",
    tag: "Viewer",
  },
];

export default async function ToolsPage() {
  await requireServerSession();

  return (
    <AppShell
      title="🧰 Katalog Tools"
      description="Pilih mesin kerja terbaik untuk mempercepat produksi konten, distribusi, dan monitoring performa."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <article key={tool.title} className="glass rounded-2xl p-6">
            <span
              className="rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ background: "var(--surface-strong)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            >
              {tool.tag}
            </span>
            <h2 className="mt-3 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
              {tool.title}
            </h2>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
              {tool.description}
            </p>
            <Link
              href={tool.href}
              className="interactive-btn mt-4 inline-flex items-center rounded-lg border px-3 py-2 text-sm font-semibold"
              style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--foreground)" }}
            >
              🚀 Buka Modul
            </Link>
          </article>
        ))}
      </div>
    </AppShell>
  );
}

