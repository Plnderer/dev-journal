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
    <button className="ambient-control" type="button" aria-label={paused ? "Resume background" : "Pause background"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
      <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
      <span className="motion-label" aria-hidden="true">{paused ? "Resume background" : "Pause background"}</span>
    </button>
  </>;
}
