"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";

export function ThemeToggleClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ThemeToggle />;
}
