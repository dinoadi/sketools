"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);

    try {
      await fetch("/api/auth/session", { method: "DELETE" });
      router.replace("/login");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isLoading}
      className="interactive-btn rounded-full border px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface-strong)",
        color: "var(--foreground)",
      }}
    >
      {isLoading ? "Keluar..." : "🚪 Sign out"}
    </button>
  );
}

