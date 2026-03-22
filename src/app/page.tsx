import Link from "next/link";
import { InstagramLogo } from "@/components/logos/instagram-logo";
import { TikTokLogo } from "@/components/logos/tiktok-logo";
import { YouTubeLogo } from "@/components/logos/youtube-logo";
import { WhatsAppLogo } from "@/components/logos/whatsapp-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-200/50 dark:border-purple-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">SkeTools</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/login"
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-purple-500/30 bg-purple-100/50 dark:bg-purple-900/30 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span>Platform Otomasi Konten #1 di Indonesia</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              <span className="gradient-text">Growth Engine</span>
              <br />
              <span className="text-gray-900 dark:text-white">Dashboard</span>
            </h1>

            <p className="mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
              Platform otomasi konten paling strategis untuk downloader, scheduler, dan viewer workflow modern. 
              Tingkatkan produktivitas konten Anda dengan tools yang powerful dan mudah digunakan.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
              >
                <span>Mulai Sekarang</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-purple-500/30 bg-white/50 dark:bg-gray-800/50 px-8 py-4 font-semibold text-gray-900 dark:text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-500/60 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:scale-105"
              >
                <span>Pelajari Lebih</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div className="rounded-2xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/50 dark:bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-3xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div className="rounded-2xl border-2 border-pink-200/50 dark:border-pink-800/50 bg-white/50 dark:bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">1M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Downloads</div>
              </div>
              <div className="rounded-2xl border-2 border-cyan-200/50 dark:border-cyan-800/50 bg-white/50 dark:bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">500K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uploads</div>
              </div>
              <div className="rounded-2xl border-2 border-emerald-200/50 dark:border-emerald-800/50 bg-white/50 dark:bg-gray-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
              Tools <span className="gradient-text">Powerful</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Semua tools yang Anda butuhkan untuk mengelola konten sosial media
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Instagram Downloader */}
            <div className="group rounded-3xl border-2 border-pink-200/50 dark:border-pink-800/50 bg-white/50 dark:bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/30 transition-all duration-300 group-hover:scale-110">
                <InstagramLogo className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Instagram Downloader
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Download reels, videos, dan images dari Instagram dengan mudah dan cepat.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-pink-600 dark:text-pink-400">
                <span>Coba Sekarang</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* YouTube Uploader */}
            <div className="group rounded-3xl border-2 border-red-200/50 dark:border-red-800/50 bg-white/50 dark:bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/30 transition-all duration-300 group-hover:scale-110">
                <YouTubeLogo className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                YouTube Uploader
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Upload video ke YouTube dengan scheduling otomatis dan manajemen konten.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
                <span>Coba Sekarang</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* TikTok Uploader */}
            <div className="group rounded-3xl border-2 border-cyan-200/50 dark:border-cyan-800/50 bg-white/50 dark:bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg shadow-cyan-500/30 transition-all duration-300 group-hover:scale-110">
                <TikTokLogo className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                TikTok Uploader
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Upload video ke TikTok dengan fitur scheduling dan manajemen akun.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                <span>Coba Sekarang</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* TikTok Viewer */}
            <div className="group rounded-3xl border-2 border-cyan-200/50 dark:border-cyan-800/50 bg-white/50 dark:bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg shadow-cyan-500/30 transition-all duration-300 group-hover:scale-110">
                <TikTokLogo className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                TikTok Viewer
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Intip dan analisis akun TikTok orang lain dengan mudah dan cepat.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                <span>Coba Sekarang</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* WhatsApp Checker */}
            <div className="group rounded-3xl border-2 border-emerald-200/50 dark:border-emerald-800/50 bg-white/50 dark:bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30 transition-all duration-300 group-hover:scale-110">
                <WhatsAppLogo className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                WhatsApp Checker
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Cek nomor WhatsApp dan dapatkan informasi profil secara real-time.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Coba Sekarang</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Scheduler */}
            <div className="group rounded-3xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/50 dark:bg-gray-800/50 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg shadow-purple-500/30 transition-all duration-300 group-hover:scale-110">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Content Scheduler
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Jadwalkan upload konten ke YouTube dan TikTok dengan mudah.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400">
                <span>Coba Sekarang</span>
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 p-12 text-center backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-pink-600/90 to-cyan-600/90"></div>
            <div className="relative z-10">
              <h2 className="mb-4 text-4xl font-bold text-white">
                Siap Meningkatkan Produktivitas?
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Bergabung dengan ribuan kreator konten yang sudah menggunakan SkeTools
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-purple-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span>Mulai Gratis Sekarang</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-200/50 dark:border-purple-800/50 bg-white/50 dark:bg-gray-800/50 py-8 px-6 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 SkeTools. All rights reserved. Built with ❤️ for content creators.
          </p>
        </div>
      </footer>
    </div>
  );
}
