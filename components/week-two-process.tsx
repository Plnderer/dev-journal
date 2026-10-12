"use client";

import { useEffect, useId, useState } from "react";
import styles from "./week-two-process.module.css";

const stages = [
  { id: "document-draft", name: "Document draft" },
  { id: "style-tile", name: "Style tile" },
  { id: "team-review", name: "Team review" },
];

export function ProcessNavigation() {
  const [active, setActive] = useState(stages[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-5% 0px -55% 0px", threshold: 0 });
    stages.forEach(stage => {
      const heading = document.getElementById(stage.id);
      if (heading) observer.observe(heading);
    });
    return () => observer.disconnect();
  }, []);
  return <nav className={styles.navigation} aria-label="Week 2 process">
    {stages.map(stage => <a key={stage.id} href={`#${stage.id}`}
      aria-current={active === stage.id ? "location" : undefined}
      onClick={() => setActive(stage.id)}>{stage.name}</a>)}
  </nav>;
}

const details = [
  { name: "Colors", image: "colors", description: "The palette keeps the warm, community-focused direction Haley shared. Each color has a name, hex value, and role." },
  { name: "Typography", image: "typography", description: "Nunito, Inter, and Raleway have separate roles. The examples show headings, body text, and captions together." },
  { name: "Icons", image: "icons", description: "The image-based icons were replaced with editable vectors. Labels explain what each icon represents." },
  { name: "Forms", image: "forms", description: "The examples show buttons, focus and disabled states, request fields, and required-field feedback." },
];

export function StyleTileExplorer() {
  const [selected, setSelected] = useState(0);
  const panelId = useId();
  const detail = details[selected];
  return <figure className={styles.explorer}>
    <figcaption><strong>Explore the style tile</strong><span>Select a detail from the actual Figma page.</span></figcaption>
    <div className={styles.choices} role="group" aria-label="Style tile details">
      {details.map((item, index) => <button key={item.name} type="button"
        aria-pressed={selected === index} aria-controls={panelId}
        onClick={() => setSelected(index)}>{item.name}</button>)}
    </div>
    <div id={panelId} className={styles.detail}>
      {/* These are crops of the original Figma export, not recreated UI. */}
      <img src={`/images/village-outreach-${detail.image}.webp`} alt={`${detail.name} section of the Village Outreach refined style tile`} />
      <p aria-live="polite">{detail.description}</p>
      <p><a href={`/images/village-outreach-${detail.image}.webp`}>Open this detail full size</a></p>
    </div>
    <a href="/images/village-outreach-refined-style-tile.png">View the complete style tile</a>
  </figure>;
}

export function WeekTwoCheckpoint() {
  return <aside className={styles.checkpoint} aria-label="Week 2 checkpoint">
    <div><h3>This week</h3><p>First SDD draft, refined UX style tile, and project setup.</p></div>
    <div><h3>Planned for Week 3</h3><p>Final SDD, first wireframes and prototype draft, Jira board, and first sprint planning.</p></div>
  </aside>;
}
