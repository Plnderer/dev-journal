import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.name, template: "%s | Eric Reyes" },
  description: site.description,
  authors: [{ name: site.author }],
  openGraph: { type: "website", title: site.name, description: site.description, locale: "en_US" },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>
    <a href="#main" className="skip-link">Skip to content</a>
    <Header />
    <main id="main" className="shell" tabIndex={-1}>{children}</main>
    <footer className="shell site-footer"><div><strong>Eric Joel Reyes Rivera</strong><p>Building thoughtfully. Learning in public.</p></div><div className="flex flex-wrap gap-6"><Link href="/blog">Journal</Link><a href="https://misfitsanctuary.art">Misfit Sanctuary <span aria-hidden="true">↗</span></a></div></footer>
  </body></html>;
}
