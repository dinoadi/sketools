import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/30">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
              <span className="text-xl">✨</span>
            </div>
            <p className="text-lg font-bold tracking-tight text-white">
              SkeTools
            </p>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Fitur</a>
            <a href="#catalog" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Katalog</a>
            <a href="#faq" className="text-sm font-medium text-white/70 hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/login" 
              className="boxy-btn inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-pink-500/40 hover:scale-105"
            >
              Login Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 pt-24 pb-20 text-center lg:pt-32">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2 text-xs font-bold tracking-wide text-pink-400 shadow-lg shadow-pink-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500"></span>
            </span>
            All-in-One Automation OS v1.0
          </span>
          <h1 className="mt-8 text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Kelola Konten{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Otomatis
            </span>{" "}
            Tanpa Ribet.
          </h1>
          <p className="mt-8 mx-auto max-w-2xl text-lg leading-8 text-white/70">
            SkeTools membantu kreator dan tim konten mengotomasi download, jadwal posting, dan riset kompetitor dalam satu dashboard premium yang cepat dan stabil.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="boxy-btn group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-pink-500/30 transition-all hover:shadow-pink-500/50 hover:scale-105"
            >
              🚀 Masuk ke Dashboard
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#catalog"
              className="boxy-btn inline-flex items-center justify-center rounded-xl border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
            >
              📂 Lihat Katalog Tools
            </Link>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-12 w-full max-w-5xl overflow-hidden rounded-3xl border-2 border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 bg-black/50">
            <div className="h-3 w-3 rounded-full bg-rose-500"></div>
            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <div className="ml-4 h-4 w-64 rounded-full bg-white/10"></div>
          </div>
          <div className="aspect-[16/9] w-full bg-gradient-to-br from-slate-900/50 to-purple-900/50 p-8">
             <div className="grid h-full grid-cols-4 gap-6">
                <div className="col-span-1 flex flex-col gap-4">
                   <div className="h-10 w-full rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30"></div>
                   <div className="h-10 w-full rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30"></div>
                   <div className="h-10 w-full rounded-lg bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/30"></div>
                   <div className="mt-auto h-10 w-full rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30"></div>
                </div>
                <div className="col-span-3 grid grid-rows-4 gap-6">
                   <div className="row-span-1 grid grid-cols-3 gap-4">
                      <div className="rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-500/5 p-4 border border-pink-500/20 shadow-lg shadow-pink-500/10">
                         <div className="h-2 w-1/2 rounded bg-pink-400/50"></div>
                         <div className="mt-2 h-6 w-3/4 rounded bg-pink-400/30"></div>
                      </div>
                      <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-4 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                         <div className="h-2 w-1/2 rounded bg-purple-400/50"></div>
                         <div className="mt-2 h-6 w-3/4 rounded bg-purple-400/30"></div>
                      </div>
                      <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 p-4 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
                         <div className="h-2 w-1/2 rounded bg-cyan-400/50"></div>
                         <div className="mt-2 h-6 w-3/4 rounded bg-cyan-400/30"></div>
                      </div>
                   </div>
                   <div className="row-span-3 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 shadow-xl"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Katalog Tools Eksklusif
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Semua yang Anda butuhkan untuk mendominasi sosial media.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ToolCard 
            icon="📸" 
            title="IG Downloader" 
            desc="Download Reels & Video IG secara massal via username atau URL."
            color="from-pink-500 to-rose-600"
            borderColor="border-pink-500/30"
          />
          <ToolCard 
            icon="📺" 
            title="YT Scheduler" 
            desc="Jadwalkan upload video YouTube secara otomatis dari cloud storage."
            color="from-red-500 to-orange-600"
            borderColor="border-red-500/30"
          />
          <ToolCard 
            icon="🎵" 
            title="TT Scheduler" 
            desc="Upload video ke TikTok sesuai jadwal tanpa perlu standby di HP."
            color="from-slate-800 to-slate-900"
            borderColor="border-slate-600/30"
          />
          <ToolCard 
            icon="👀" 
            title="TT Viewer" 
            desc="Pantau konten viral TikTok kompetitor tanpa perlu login."
            color="from-cyan-500 to-blue-600"
            borderColor="border-cyan-500/30"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-white/10 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5 py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          <StatCard label="Total Tools" value="10+" color="text-pink-400" />
          <StatCard label="Success Rate" value="99.9%" color="text-purple-400" />
          <StatCard label="Uptime" value="24/7" color="text-cyan-400" />
          <StatCard label="Cost Saved" value="80%" color="text-rose-400" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 py-12 text-center">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
              <span className="text-sm">✨</span>
            </div>
            <p className="text-sm font-bold tracking-tight text-white">
              SkeTools
            </p>
          </div>
          <p className="text-sm text-white/60">
            © 2026 SkeTools Growth OS. Dibuat untuk tim konten masa depan.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ToolCard({ icon, title, desc, color, borderColor }: { icon: string; title: string; desc: string; color: string; borderColor: string }) {
  return (
    <article className={`group relative overflow-hidden rounded-2xl border-2 ${borderColor} bg-gradient-to-br ${color} p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30`}>
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-2xl shadow-lg backdrop-blur-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/80">{desc}</p>
      <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider text-white/60 opacity-0 transition-opacity group-hover:opacity-100">
        Detail Selengkapnya →
      </div>
    </article>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <p className={`text-4xl font-black ${color}`}>{value}</p>
      <p className="mt-2 text-sm font-bold uppercase tracking-widest text-white/60">{label}</p>
    </div>
  );
}
