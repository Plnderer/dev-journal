import styles from "./week-four-progress.module.css";

function WorkIcon({ kind }: { kind: "connection" | "user" | "migration" | "tests" }) {
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "connection" && <><ellipse cx="30" cy="12" rx="11" ry="5"/><path d="M19 12v19c0 7 22 7 22 0V12M19 22c0 7 22 7 22 0M5 25h7v15h16M2 30h6m-6 5h6"/></>}
    {kind === "user" && <><circle cx="24" cy="15" r="8"/><path d="M9 41v-5c0-16 30-16 30 0v5Z"/><path d="m33 22 4 4 8-9"/></>}
    {kind === "migration" && <><path d="M7 7h22v10H7zM19 31h22v10H19zM18 17v9h12m-5-5 5 5-5 5"/><path d="M12 12h12m0 24h12"/></>}
    {kind === "tests" && <><path d="m5 12 3 3 5-6m-8 15 3 3 5-6m-8 15 3 3 5-6M21 12h22M21 24h22M21 36h22"/></>}
  </svg>;
}

const work = [
  { kind: "connection", title: "Connect", detail: "Repeatable database check", code: "SELECT 1", ticket: "CCVO-3" },
  { kind: "user", title: "Model", detail: "One profile per Auth identity", code: "User + unique identity", ticket: "CCVO-4" },
  { kind: "migration", title: "Migrate", detail: "Version the database structure", code: "Alembic → users", ticket: "CCVO-28" },
  { kind: "tests", title: "Test", detail: "Check success and failure paths", code: "Isolated PostgreSQL", ticket: "CCVO-30" },
] as const;

export function FoundationCards() {
  return <figure className={styles.figure}>
    <div className={styles.workGrid}>{work.map(item => <div key={item.ticket} className={styles.workItem}>
      <div className={styles.icon}><WorkIcon kind={item.kind}/></div>
      <strong>{item.title}</strong><span>{item.detail}</span><code>{item.code}</code>
      <a href={`https://village-outreach.atlassian.net/browse/${item.ticket}`}>{item.ticket}<span className={styles.srOnly}>: {item.title} task</span></a>
    </div>)}</div>
    <figcaption>My four backend tasks, from connection checks to repeatable tests.</figcaption>
  </figure>;
}

export function TestResults() {
  return <figure className={styles.figure}>
    <div className={styles.results}>
      <div className={styles.score}><strong>56</strong><span>tests passed</span><small>Local PostgreSQL · Oct. 25</small></div>
      <ul className={styles.checks}>{["API health response", "Save and reload a User", "Reject duplicate identities", "Reverse and reapply migrations", "Clean up test records"].map(check => <li key={check}><span aria-hidden="true">✓</span>{check}</li>)}</ul>
    </div>
    <figcaption>Verified backend foundation. Authentication and full mobile integration are next.</figcaption>
  </figure>;
}
