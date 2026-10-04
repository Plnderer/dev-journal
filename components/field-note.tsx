"use client";
import Image from "next/image";
import { useRef,useState,type PointerEvent } from "react";
export function FieldNote() {
 const art=useRef<HTMLElement>(null);
 const [paused,setPaused]=useState(false);
 function move(event:PointerEvent<HTMLElement>) {
   if(event.pointerType!=="mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches || paused) return;
   const bounds=event.currentTarget.getBoundingClientRect();
   art.current?.style.setProperty("--art-x",`${((event.clientX-bounds.left)/bounds.width-.5)*12}px`);
   art.current?.style.setProperty("--art-y",`${((event.clientY-bounds.top)/bounds.height-.5)*12}px`);
 }
 function reset(){ art.current?.style.setProperty("--art-x","0px");art.current?.style.setProperty("--art-y","0px"); }
 return <aside ref={art} onPointerMove={move} onPointerLeave={reset} className={`hero-art ${paused ? "motion-paused":""}`} aria-label="Original science-fiction journal artwork">
  <div className="hero-image"><Image src="/images/journal-signal.webp" alt="A faceless synthetic explorer against a lime disk and violet-lit monoliths" fill sizes="(max-width:640px) 100vw, 1200px" priority /></div>
  <div className="art-grid" aria-hidden="true"/>
  <span className="art-coordinate" aria-hidden="true">ER / 001<br/>IDEAS IN ORBIT</span>
  <button type="button" className="motion-button" aria-pressed={paused} onClick={()=>{setPaused(!paused);reset();}}>{paused ? "Resume motion" : "Pause motion"} <span aria-hidden="true">{paused ? "▷":"Ⅱ"}</span></button>
 </aside>;
}
