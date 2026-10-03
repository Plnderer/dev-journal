"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
export function Header() {
  const pathname = usePathname();
  return <header className="site-header shell">
    <Link href="/" className="brand" aria-label="Eric Reyes home"><span className="monogram" aria-hidden="true">er<span>.</span></span><span>ERIC REYES<span className="brand-sub">DEVELOPMENT JOURNAL</span></span></Link>
    <nav aria-label="Main navigation" className="flex items-center gap-5 sm:gap-8">
      {[{href:"/", label:"Home"}, {href:"/blog", label:"Blog"}, {href:"/about", label:"About"}].map(item => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
      })}
      <a href={site.github}>GitHub <span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}
