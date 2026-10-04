"use client";
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("eric-journal-theme", next); } catch { /* Theme still works without storage. */ }
  }
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle light and dark theme" title="Toggle light and dark theme"><span className="theme-moon" aria-hidden="true">☾</span><span className="theme-sun" aria-hidden="true">☀</span></button>;
}
