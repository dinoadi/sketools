import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="gradient-hero relative min-h-screen overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <p className="text-lg font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
              SkeTools
            </p>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium hover:opacity-70" style={{ color: "var(--muted)" }}>Fitur</a>
            <a href="#catalog" className="text-sm font-medium hover:opacity-70" style={{ color: "var(--muted)" }}>Katalog</a>
            <a href="#faq" className="text-sm font-medium hover:opacity-70" style={{ color: "var(--muted)" }}>FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login" className="interactive-btn rounded-full px-5 py-2 text-sm font-bold shadow-lg transition-all" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
              Login Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 pt-24 pb-20 text-center lg:pt-32">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-wide shadow-sm" style={{ borderColor: "var(--border)", background: "var(--surface-strong)", color: "var(--primary)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            All-in-One Automation OS v1.0
          </span>
          <h1 className="mt-8 text-5xl font-black leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl" style={{ color: "var(--foreground)" }}>
            Kelola Konten <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Otomatis</span> Tanpa Ribet.
          </h1>
          <p className="mt-8 mx-auto max-w-2xl text-lg leading-8" style={{ color: "var(--muted)" }}>
            SkeTools membantu kreator dan tim konten mengotomasi download, jadwal posting, dan riset kompetitor dalam satu dashboard premium yang cepat dan stabil.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="interactive-btn group inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-bold shadow-xl transition-all"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              🚀 Masuk ke Dashboard
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#catalog"
              className="interactive-btn inline-flex items-center justify-center rounded-2xl border px-8 py-4 text-base font-bold transition-all"
              style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--surface)" }}
            >
              📂 Lihat Katalog Tools
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Placeholder */}
        <div className="glass mt-12 w-full max-w-5xl overflow-hidden rounded-3xl border shadow-2xl" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "var(--border)", background: "var(--surface-strong)" }}>
            <div className="h-3 w-3 rounded-full bg-rose-500"></div>
            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <div className="ml-4 h-4 w-64 rounded-full bg-slate-200 dark:bg-slate-800"></div>
          </div>
          <div className="aspect-[16/9] w-full bg-slate-50 p-8 dark:bg-slate-900/50">
             <div className="grid h-full grid-cols-4 gap-6">
                <div className="col-span-1 flex flex-col gap-4">
                   <div className="h-10 w-full rounded-lg bg-slate-200 dark:bg-slate-800"></div>
                   <div className="h-10 w-full rounded-lg bg-slate-200 dark:bg-slate-800"></div>
                   <div className="h-10 w-full rounded-lg bg-slate-200 dark:bg-slate-800"></div>
                   <div className="mt-auto h-10 w-full rounded-lg bg-slate-200 dark:bg-slate-800"></div>
                </div>
                <div className="col-span-3 grid grid-rows-4 gap-6">
                   <div className="row-span-1 grid grid-cols-3 gap-4">
                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
                         <div className="h-2 w-1/2 rounded bg-slate-100 dark:bg-slate-700"></div>
                         <div className="mt-2 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-600"></div>
                      </div>
                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
                         <div className="h-2 w-1/2 rounded bg-slate-100 dark:bg-slate-700"></div>
                         <div className="mt-2 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-600"></div>
                      </div>
                      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
                         <div className="h-2 w-1/2 rounded bg-slate-100 dark:bg-slate-700"></div>
                         <div className="mt-2 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-600"></div>
                      </div>
                   </div>
                   <div className="row-span-3 rounded-2xl bg-white shadow-sm dark:bg-slate-800"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black sm:text-4xl" style={{ color: "var(--foreground)" }}>
            Katalog Tools Eksklusif
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--muted)" }}>
            Semua yang Anda butuhkan untuk mendominasi sosial media.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <ToolCard 
            icon="📸" 
            title="IG Downloader" 
            desc="Download Reels & Video IG secara massal via username atau URL."
            color="bg-pink-500"
          />
          <ToolCard 
            icon="📺" 
            title="YT Scheduler" 
            desc="Jadwalkan upload video YouTube secara otomatis dari cloud storage."
            color="bg-red-500"
          />
          <ToolCard 
            icon="🎵" 
            title="TT Scheduler" 
            desc="Upload video ke TikTok sesuai jadwal tanpa perlu standby di HP."
            color="bg-slate-900"
          />
          <ToolCard 
            icon="👀" 
            title="TT Viewer" 
            desc="Pantau konten viral TikTok kompetitor tanpa perlu login."
            color="bg-cyan-500"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y py-20" style={{ borderColor: "var(--border)", background: "var(--surface-strong)" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          <StatCard label="Total Tools" value="10+" />
          <StatCard label="Success Rate" value="99.9%" />
          <StatCard label="Uptime" value="24/7" />
          <StatCard label="Cost Saved" value="80%" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 py-12 text-center">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <p className="text-sm font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
              SkeTools
            </p>
          </div>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            © 2026 SkeTools Growth OS. Dibuat untuk tim konten masa depan.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:underline" style={{ color: "var(--muted)" }}>Terms</a>
            <a href="#" className="text-sm hover:underline" style={{ color: "var(--muted)" }}>Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ToolCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <article className="glass group relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-2">
      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-lg ${color} text-white`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{title}</h3>
      <p className="mt-3 text-sm leading-6" style={{ color: "var(--muted)" }}>{desc}</p>
      <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "var(--primary)" }}>
        Detail Selengkapnya →
      </div>
    </article>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-4xl font-black" style={{ color: "var(--foreground)" }}>{value}</p>
      <p className="mt-2 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>{label}</p>
    </div>
  );
}
