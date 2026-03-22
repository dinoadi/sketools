"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border-2 border-purple-500/30 bg-white/10 dark:bg-black/20 px-4 py-2 text-xs font-semibold text-gray-900 dark:text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-500/60 hover:bg-white/20 dark:hover:bg-black/30 hover:scale-105"
      aria-label="Toggle dark light mode"
      title="Toggle dark light mode"
    >
      {theme === "dark" ? (
        <>
          <span className="text-lg">🌙</span>
          <span>Dark</span>
        </>
      ) : (
        <>
          <span className="text-lg">☀️</span>
          <span>Light</span>
        </>
      )}
    </button>
  );
}
