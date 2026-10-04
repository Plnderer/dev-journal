"use client";
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("eric-journal-theme", next); } catch { /* Theme still works without storage. */ }
  }
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label="Toggle light and dark theme" title="Toggle light and dark theme"><svg className="theme-moon" aria-hidden="true" viewBox="0 0 24 24"><path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/></svg><svg className="theme-sun" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></svg></button>;
}
