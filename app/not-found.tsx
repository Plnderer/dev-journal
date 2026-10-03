import Link from "next/link";
export default function NotFound() { return <div className="page-heading"><p className="eyebrow">404 · A SMALL DETOUR</p><h1>This page isn’t here.</h1><p>Let’s get you back to the journal.</p><Link href="/blog" className="button">Browse all entries →</Link></div>; }
