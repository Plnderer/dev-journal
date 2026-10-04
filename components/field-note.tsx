"use client";
import Image from "next/image";
import { useRef,useState,type PointerEvent } from "react";
export function FieldNote() {
 const art=useRef<HTMLElement>(null);
 const [paused,setPaused]=useState(false);
 function move(event:PointerEvent<HTMLElement>) {
  if(event.pointerType!=="mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches || paused) return;
  const bounds=event.currentTarget.getBoundingClientRect();
  art.current?.style.setProperty("--art-x",`${((event.clientX-bounds.left)/bounds.width-.5)*8}px`);
  art.current?.style.setProperty("--art-y",`${((event.clientY-bounds.top)/bounds.height-.5)*8}px`);
 }
 function reset(){art.current?.style.setProperty("--art-x","0px");art.current?.style.setProperty("--art-y","0px");}
 return <aside ref={art} onPointerMove={move} onPointerLeave={reset} className={`hero-art ${paused ? "motion-paused":""}`} aria-label="Original science-fiction journal artwork">
  <div className="hero-image"><Image src="/images/journal-signal.webp" alt="A faceless synthetic explorer against a lime disk and violet-lit monoliths" fill sizes="(max-width:760px) 100vw, 55vw" priority /></div>
  <div className="art-registration" aria-hidden="true"><span>ER—001</span><span>EXPLORATION / DEVELOPMENT</span><i/></div>
  <div className="art-bottom"><span>INDEPENDENT BY DESIGN</span><button type="button" className="motion-button" aria-label={paused ? "Resume motion" : "Pause motion"} aria-pressed={paused} onClick={()=>{setPaused(!paused);reset();}}><span aria-hidden="true">{paused ? "▷":"Ⅱ"}</span><span className="motion-label" aria-hidden="true">{paused ? "Resume motion":"Pause motion"}</span></button></div>
 </aside>;
}
