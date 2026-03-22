import { redirect } from "next/navigation";

import { DevLoginForm } from "@/components/auth/dev-login-form";
import { getServerSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/10 blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 blur-3xl"></div>
      </div>

      <section className="relative z-10 w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border-2 border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 sm:p-10 backdrop-blur-xl shadow-2xl backdrop-blur-sm">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/30">
              <span className="text-2xl">✨</span>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-bold tracking-wide text-pink-400">
                🔐 Admin Access
              </span>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">
                Login ke SkeTools
              </h1>
            </div>
          </div>
          
          <p className="mb-8 text-center text-sm leading-6 text-white/70">
            Gunakan kredensial default untuk mengakses semua fitur tools di dashboard.
            <span className="block mt-2 font-semibold text-pink-400">
              Username/Email: <span className="text-white">admin</span>, Password: <span className="text-white">admin</span>
            </span>
          </p>

          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-xl"></div>
            <div className="relative">
              <DevLoginForm />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/50">
            <span>🔒 Secure Login</span>
            <span className="text-white/30">•</span>
            <span>🚀 Fast Access</span>
            <span className="text-white/30">•</span>
            <span>💎 Premium Dashboard</span>
          </div>
        </div>
      </section>
    </main>
  );
}

