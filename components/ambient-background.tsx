"use client";

import { useState } from "react";

export function AmbientBackground() {
  const [paused, setPaused] = useState(false);

  return <>
    <div className={`ambient-background ${paused ? "ambient-paused" : ""}`} aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-orbit ambient-orbit-one" />
      <div className="ambient-orbit ambient-orbit-two" />
      <div className="ambient-signal" />
    </div>
    <button className="ambient-control" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
      <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
      {paused ? "Resume background" : "Pause background"}
    </button>
  </>;
}
