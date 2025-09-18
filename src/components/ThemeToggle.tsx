"use client";

import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        padding: "8px 12px",
        borderRadius: 6,
        border: "1px solid var(--border)",
        background: "var(--button-bg)",
        color: "var(--button-fg)",
        cursor: "pointer",
      }}
    >
      {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}

