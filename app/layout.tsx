import localFont from "next/font/local";
import type { Metadata } from "next";
import Link from "next/link";
import { AmbientBackground } from "@/components/ambient-background";
import { Header } from "@/components/header";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";
const display = localFont({src:"../public/fonts/spacegrotesk-SpaceGrotesk[wght].ttf",variable:"--font-display",display:"swap",weight:"300 700"});
const headline = localFont({src:[{path:"../public/fonts/BarlowCondensed-Bold.ttf",weight:"700",style:"normal"},{path:"../public/fonts/BarlowCondensed-BoldItalic.ttf",weight:"700",style:"italic"}],variable:"--font-headline",display:"swap"});
const mono = localFont({src:"../public/fonts/ibmplexmono-IBMPlexMono-Regular.ttf",variable:"--font-mono",display:"swap",weight:"400"});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.name, template: "%s | Eric Reyes" },
  description: site.description,
  authors: [{ name: site.author }],
  openGraph: { type: "website", title: site.name, description: site.description, locale: "en_US" },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" className={`${display.variable} ${mono.variable} ${headline.variable}`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html: `try { var t = localStorage.getItem('eric-journal-theme'); document.documentElement.dataset.theme = t === 'light' || t === 'dark' ? t : 'dark'; } catch (_) { document.documentElement.dataset.theme = 'dark'; }`}} /></head><body>
    <a href="#main" className="skip-link">Skip to content</a>
    <AmbientBackground />
    <Header />
    <main id="main" className="shell" tabIndex={-1}>{children}</main>
    <footer className="shell site-footer"><div><strong>Eric Reyes</strong><p>Building thoughtfully. Learning in public.</p></div><div className="flex flex-wrap gap-6"><Link href="/blog">Journal</Link><a href="https://misfitsanctuary.art">Misfit Sanctuary <span aria-hidden="true">↗</span></a></div></footer>
  </body></html>;
}
