import { redirect } from "next/navigation";

import { DevLoginForm } from "@/components/auth/dev-login-form";
import { getServerSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="gradient-hero relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      <section className="glass relative w-full max-w-md rounded-3xl p-8 sm:p-10">
        <span
          className="inline-flex rounded-full border px-3 py-1 text-xs font-medium"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          🔐 Admin Access Portal
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          Login ke SkeTools Growth Dashboard
        </h1>
        <p className="mt-3 text-sm leading-6" style={{ color: "var(--muted)" }}>
          Gunakan kredensial default untuk mengakses semua fitur tools di dashboard.
          Username/Email: <strong>admin</strong>, Password: <strong>admin</strong>.
        </p>

        <div className="mt-8">
          <DevLoginForm />
        </div>
      </section>
    </main>
  );
}

