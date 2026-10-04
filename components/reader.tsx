"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
export function Reader({children}: {children: ReactNode}) {
  const content = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [large,setLarge] = useState(false);
  const [copyStatus,setCopyStatus] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(()=>{
    let frame = 0;
    function update() {
      frame = 0;
      if (!content.current || !progress.current) return;
      const rect = content.current.getBoundingClientRect();
      const total = rect.height - innerHeight;
      const percent = total > 0 ? Math.max(0,Math.min(1,-rect.top / total)) : (rect.top < innerHeight ? 1 : 0);
      progress.current.style.transform = `scaleX(${percent})`;
    }
    function requestUpdate() { if (!frame) frame = requestAnimationFrame(update); }
    const observer = new ResizeObserver(requestUpdate);
    if (content.current) observer.observe(content.current);
    window.addEventListener("scroll",requestUpdate,{passive:true});
    window.addEventListener("resize",requestUpdate);
    update();
    return ()=>{ observer.disconnect(); window.removeEventListener("scroll",requestUpdate); window.removeEventListener("resize",requestUpdate); cancelAnimationFrame(frame); if(copyTimer.current) clearTimeout(copyTimer.current); };
  },[]);
  async function copyLink() {
    if(copyTimer.current) clearTimeout(copyTimer.current);
    try { await navigator.clipboard.writeText(location.href); setCopyStatus("Link copied"); }
    catch { setCopyStatus("Copy the address from your browser"); }
    copyTimer.current = setTimeout(()=>setCopyStatus(""),3500);
  }
  return <><div className="reading-progress" aria-hidden="true"><div ref={progress}/></div>
    <div className="reader-toolbar"><span className="eyebrow">MAKE YOURSELF COMFORTABLE</span><div className="reader-buttons"><button type="button" onClick={()=>setLarge(!large)} aria-pressed={large} aria-label="Larger reading text">Aa <span>{large ? "Standard text" : "Larger text"}</span></button><button type="button" onClick={copyLink}>Copy link <span aria-hidden="true">↗</span></button></div></div>
    <p className="copy-status" role="status">{copyStatus}</p>
    <div ref={content} className={`reading-content ${large ? "large-text" : ""}`}>{children}</div>
    <button type="button" className="back-top text-link" onClick={()=>window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"})}>Back to top ↑</button>
  </>;
}
