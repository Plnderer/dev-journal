"use client";
import { useState } from "react";
const steps = [
  { name:"Understand", short:"Ask better questions.", detail:"Start with the problem. Ask who needs a solution, what matters to them, and how success can be measured." },
  { name:"Build", short:"Turn ideas into software.", detail:"Make a small, working version. Break the work into clear tasks and test the decisions as you go." },
  { name:"Reflect", short:"Make the next version better.", detail:"Look at what worked and what didn’t. Use feedback and lessons from the process to decide the next step." },
];
export function Journey() {
  const [selected, setSelected] = useState(0);
  return <figure className="journey" aria-label="Development cycle: Understand, Build, Reflect, then repeat">
    <div className="flex justify-between gap-4"><span className="eyebrow">THE PROCESS</span><span className="mono text-xs">SELECT A STEP TO EXPLORE</span></div>
    <ol className="journey-steps">{steps.map((step,index)=><li key={step.name}><button type="button" aria-pressed={selected===index} aria-controls="journey-detail" onClick={()=>setSelected(index)}><span className="step-number">0{index+1}</span><strong>{step.name}</strong><span>{step.short}</span></button></li>)}</ol>
    <figcaption id="journey-detail" aria-live="polite"><strong>{steps[selected].name}.</strong> {steps[selected].detail}</figcaption>
  </figure>;
}
