import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { requireServerSession } from "@/lib/auth/require-session";

const tools = [
  {
    title: "⚡ Instagram Reels Downloader",
    description: "Unduh konten reels dari single URL atau discovery massal dengan preview seleksi super cepat.",
    href: "/downloader",
    tag: "Downloader",
    color: "from-pink-500 to-rose-600",
    borderColor: "border-pink-500/30",
    icon: "📸",
  },
  {
    title: "📺 YouTube Scheduler",
    description: "Jadwalkan upload YouTube berbasis URL, upload lokal, atau path VPS dengan flow yang presisi.",
    href: "/scheduler-center",
    tag: "Scheduler",
    color: "from-red-500 to-red-600",
    borderColor: "border-red-500/30",
    icon: "▶️",
  },
  {
    title: "🎵 TikTok Scheduler",
    description: "Kelola antrean posting TikTok dengan retry policy otomatis agar campaign tetap on-track.",
    href: "/scheduler-center",
    tag: "Scheduler",
    color: "from-cyan-500 to-pink-600",
    borderColor: "border-cyan-500/30",
    icon: "🎵",
  },
  {
    title: "👀 TikTok Viewer",
    description: "Akses konten TikTok publik tanpa login dengan cache cerdas dan rate limit aman.",
    href: "/tiktok-viewer",
    tag: "Viewer",
    color: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-500/30",
    icon: "👀",
  },
];

export default async function ToolsPage() {
  await requireServerSession();

  return (
    <AppShell
      title={
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30">
            <span className="text-2xl">🧰</span>
          </div>
          <span className="text-white">Katalog Tools</span>
        </div>
      }
      description="Pilih mesin kerja terbaik untuk mempercepat produksi konten, distribusi, dan monitoring performa."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => (
          <article 
            key={tool.title} 
            className="group relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br p-6 backdrop-blur-sm shadow-2xl transition-all hover:scale-105 hover:shadow-3xl"
            style={{ 
              borderColor: tool.borderColor.replace('/30', '/20'),
              background: `linear-gradient(135deg, ${tool.color.split(' ')[0].replace('from-', '')}10, ${tool.color.split(' ')[1].replace('to-', '')}10)`
            }}
          >
            <div className={`absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br ${tool.color} blur-2xl opacity-20`}></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <span
                  className="rounded-xl border-2 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm"
                  style={{ borderColor: tool.borderColor }}
                >
                  {tool.tag}
                </span>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} shadow-lg`}>
                  <span className="text-xl">{tool.icon}</span>
                </div>
              </div>
              <h2 className="mt-4 text-lg font-bold text-white">
                {tool.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                {tool.description}
              </p>
              <Link
                href={tool.href}
                className={`interactive-btn mt-4 inline-flex items-center rounded-xl border-2 bg-gradient-to-r ${tool.color} px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105`}
              >
                🚀 Buka Modul
              </Link>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}

