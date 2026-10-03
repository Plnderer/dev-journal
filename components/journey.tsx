export function Journey() {
  return <figure className="journey" aria-label="Development cycle: Understand, Build, Reflect, then repeat">
    <div className="flex justify-between gap-4"><span className="eyebrow">THE PROCESS</span><span className="mono text-xs">LEARN. ITERATE. REPEAT.</span></div>
    <ol className="journey-steps">
      <li><span className="step-number">01</span><strong>Understand</strong><span>Ask better questions.</span></li>
      <li><span className="step-number">02</span><strong>Build</strong><span>Turn ideas into software.</span></li>
      <li><span className="step-number">03</span><strong>Reflect</strong><span>Make the next version better.</span></li>
    </ol>
    <figcaption>A simple cycle for the work ahead.</figcaption>
  </figure>;
}
