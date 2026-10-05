"use client";
import { useState } from "react";
const steps = [
  { name:"Understand", short:"Identify the problem.", detail:"First, I need to know what should happen and what needs to work." },
  { name:"Build", short:"Build and test.", detail:"I’ll work through one task at a time, then check whether it does what I expected." },
  { name:"Reflect", short:"Review the result.", detail:"I’ll write down what worked, what failed, and what I need to try next." },
];
export function Journey() {
  const [selected, setSelected] = useState(0);
  return <figure className="journey" aria-label="Development cycle: Understand, Build, Reflect, then repeat">
    <div className="flex justify-between gap-4"><span className="eyebrow">THE PROCESS</span><span className="mono text-xs">SELECT A STEP TO EXPLORE</span></div>
    <ol className="journey-steps">{steps.map((step,index)=><li key={step.name}><button type="button" aria-pressed={selected===index} aria-controls="journey-detail" onClick={()=>setSelected(index)}><span className="step-number">0{index+1}</span><strong>{step.name}</strong><span>{step.short}</span></button></li>)}</ol>
    <figcaption id="journey-detail" aria-live="polite"><strong>{steps[selected].name}.</strong> {steps[selected].detail}</figcaption>
  </figure>;
}
