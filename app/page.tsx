import { FieldNote } from "@/components/field-note";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { getPosts } from "@/lib/posts";
export default function Home() {
 const posts=getPosts();
 return <>
  <div className="section-index"><span><i aria-hidden="true"/> ERIC REYES / DEVELOPMENT JOURNAL</span><span>VOL. 01 <span aria-hidden="true">↘</span></span></div>
  <section className="hero">
    <div className="hero-copy"><p className="eyebrow">SOFTWARE DEVELOPMENT / PROJECT NOTES</p>
      <h1>BUILD.<br/><span className="outline-word">TEST.</span><br/><span className="highlight-word">LEARN.</span></h1>
      <p className="hero-intro">I’m Eric Reyes, a Computer Science student.<br/>Here I write about what I’m building, what I tried, and what I’m learning.</p>
      <div className="hero-links"><Link href="/blog" className="button">Read the journal <span aria-hidden="true">↗</span></Link><Link href="/about" className="text-link">About Eric <span aria-hidden="true">↗</span></Link></div>
      <div className="hero-foot"><span className="barcode" aria-hidden="true"/><span>THINK / BUILD / REFLECT</span></div>
    </div>
    <FieldNote />
  </section>
  <div className="discipline-strip"><span>01 / SOFTWARE</span><span>02 / ARTIFICIAL INTELLIGENCE</span><span>03 / PROJECT NOTES</span><span className="strip-symbol" aria-hidden="true">✳</span></div>
  <section className="entries-section" aria-labelledby="latest"><div className="section-heading"><div><p className="eyebrow">RECENT NOTES</p><h2 id="latest">Latest entry<span className="count">{String(posts.length).padStart(2,"0")}</span></h2></div><Link href="/blog" className="text-link">All entries <span aria-hidden="true">↗</span></Link></div>
    {posts.length ? posts.slice(0,3).map(post=><PostCard key={post.slug} post={post}/>) : <p className="empty-state">The first entry is on its way.</p>}
  </section>
  <section className="manifesto"><div className="manifesto-heading"><span className="eyebrow">HOW I APPROACH THE WORK</span><h2>Understand<br/>the <span>problem.</span></h2></div><div className="manifesto-copy"><p>Break it into steps.<br/>Try a solution.<br/>Check what happens.</p><p className="muted">If something fails, I want to understand why. I’ll use these notes to explain what I changed and whether it worked.</p><Link href="/about" className="text-link">More about me <span aria-hidden="true">↗</span></Link></div><div className="manifesto-mark" aria-hidden="true">+</div></section>
 </>;
}
