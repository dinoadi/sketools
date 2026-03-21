"use client";

import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

const STORAGE_KEY = "sketools-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    return (window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null) === "light"
      ? "light"
      : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function handleToggle() {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="interactive-btn inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold"
      style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
      aria-label="Toggle dark light mode"
      title="Toggle dark light mode"
    >
      <span>{theme === "dark" ? "🌙 Dark" : "☀️ Light"}</span>
    </button>
  );
}

