import Link from "next/link";
import { redirect } from "next/navigation";
import { DevLoginForm } from "@/components/auth/dev-login-form";
import { getServerSession } from "@/lib/auth/session";
import { ThemeToggleClient } from "@/components/theme-toggle-client";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-purple-200/50 dark:border-purple-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">SkeTools</span>
            </Link>
            <ThemeToggleClient />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center px-6 pt-20">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Login Card */}
          <div className="overflow-hidden rounded-3xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/80 dark:bg-gray-800/80 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 animate-float">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-purple-500/30 bg-purple-100/50 dark:bg-purple-900/30 px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span>Admin Access</span>
              </div>

              <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                Login ke SkeTools
              </h1>
              
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                Gunakan kredensial default untuk mengakses semua fitur tools di dashboard.
              </p>
            </div>

            {/* Credentials Info */}
            <div className="mb-6 rounded-2xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-purple-50/50 dark:bg-purple-900/20 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                    Default Credentials
                  </p>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Username: <span className="font-mono font-bold">admin</span> | Password: <span className="font-mono font-bold">admin</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-xl"></div>
              <div className="relative">
                <DevLoginForm />
              </div>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-purple-200/50 dark:border-purple-800/50 bg-purple-50/50 dark:bg-purple-900/20 p-3 text-center backdrop-blur-sm">
                <div className="mb-1 text-2xl">🔒</div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Secure</p>
              </div>
              <div className="rounded-xl border border-pink-200/50 dark:border-pink-800/50 bg-pink-50/50 dark:bg-pink-900/20 p-3 text-center backdrop-blur-sm">
                <div className="mb-1 text-2xl">⚡</div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Fast</p>
              </div>
              <div className="rounded-xl border border-cyan-200/50 dark:border-cyan-800/50 bg-cyan-50/50 dark:bg-cyan-900/20 p-3 text-center backdrop-blur-sm">
                <div className="mb-1 text-2xl">💎</div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Premium</p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 transition-colors duration-300 hover:text-purple-700 dark:hover:text-purple-300"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              © 2024 SkeTools. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
