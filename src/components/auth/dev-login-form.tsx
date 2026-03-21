"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DevLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "Login gagal");
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login gagal, coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <label className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
        Username / Email
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface-strong)",
            color: "var(--foreground)",
          }}
          autoComplete="username"
          placeholder="admin"
          required
        />
      </label>

      <label className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1.5 w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition"
          style={{
            borderColor: "var(--border)",
            background: "var(--surface-strong)",
            color: "var(--foreground)",
          }}
          autoComplete="current-password"
          required
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="interactive-btn mt-2 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        {isLoading ? "Memproses..." : "🔐 Masuk Sekarang"}
      </button>

      {error ? (
        <p className="rounded-lg border px-3 py-2 text-xs" style={{ borderColor: "#fb7185", color: "#fb7185" }}>
          {error}
        </p>
      ) : null}
    </form>
  );
}
