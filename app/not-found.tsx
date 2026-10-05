import Link from "next/link";
export default function NotFound() { return <div className="page-heading"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>Page not found.</h1><p>Use the journal index to find an entry.</p><Link href="/blog" className="button">Browse all entries →</Link></div>; }
