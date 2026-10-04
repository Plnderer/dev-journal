"use client";
import { useRef, useState, type PointerEvent } from "react";
export function FieldNote() {
  const card = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  function tilt(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    card.current?.style.setProperty("--tilt-x", `${((event.clientY-bounds.top)/bounds.height-.5)*-7}deg`);
    card.current?.style.setProperty("--tilt-y", `${((event.clientX-bounds.left)/bounds.width-.5)*7}deg`);
  }
  function reset() { card.current?.style.setProperty("--tilt-x", "0deg"); card.current?.style.setProperty("--tilt-y", "0deg"); }
  return <aside ref={card} onPointerMove={tilt} onPointerLeave={reset} className={`field-note ${paused ? "motion-paused" : ""}`}>
    <div className="flex justify-between"><span className="eyebrow">FIELD NOTES</span><span className="mono text-xs">VOL. 01 / 2026</span></div>
    <div className="orbit" aria-hidden="true"><span>&lt; / &gt;</span><i className="orbit-dot" /></div>
    <p>From an idea<br />to something useful.</p>
    <div className="note-bottom"><span>COMPUTER SCIENCE</span><button className="motion-button" type="button" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused ? "Resume animation" : "Pause animation"}<span aria-hidden="true"> {paused ? "▷" : "Ⅱ"}</span></button></div>
  </aside>;
}
