import { FieldNote } from "@/components/field-note";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { getPosts } from "@/lib/posts";
export default function Home() {
 const posts=getPosts();
 return <>
  <div className="section-index"><span><i aria-hidden="true"/> ERIC REYES / DEVELOPMENT JOURNAL</span><span>VOL. 01 <span aria-hidden="true">↘</span></span></div>
  <section className="hero">
    <div className="hero-copy"><p className="eyebrow">A MISFIT MIND. A BUILDER’S JOURNEY.</p>
      <h1>IDEAS.<br/><span className="outline-word">INTO</span><br/><span className="highlight-word">REALITY.</span></h1>
      <p className="hero-intro">Software, AI, and the art of figuring it out.<br/>I’m Eric. This is where I document the process.</p>
      <div className="hero-links"><Link href="/blog" className="button">Read the journal <span aria-hidden="true">↗</span></Link><Link href="/about" className="text-link">About Eric <span aria-hidden="true">↗</span></Link></div>
      <div className="hero-foot"><span className="barcode" aria-hidden="true"/><span>THINK / BUILD / REFLECT</span></div>
    </div>
    <FieldNote />
  </section>
  <div className="discipline-strip"><span>01 / SOFTWARE</span><span>02 / ARTIFICIAL INTELLIGENCE</span><span>03 / CREATIVE CURIOSITY</span><span className="strip-symbol" aria-hidden="true">✳</span></div>
  <section className="entries-section" aria-labelledby="latest"><div className="section-heading"><div><p className="eyebrow">THE DEVELOPMENT LOG</p><h2 id="latest">Latest entry<span className="count">{String(posts.length).padStart(2,"0")}</span></h2></div><Link href="/blog" className="text-link">All entries <span aria-hidden="true">↗</span></Link></div>
    {posts.length ? posts.slice(0,3).map(post=><PostCard key={post.slug} post={post}/>) : <p className="empty-state">The first entry is on its way.</p>}
  </section>
  <section className="manifesto"><div className="manifesto-heading"><span className="eyebrow">FROM THE MISFIT SANCTUARY UNIVERSE</span><h2>Curiosity is<br/>the <span>constant.</span></h2></div><div className="manifesto-copy"><p>Think independently.<br/>Build with purpose.<br/>Keep a record.</p><p className="muted">The questions, the decisions, and the lessons that turn an idea into working software.</p><Link href="/about" className="text-link">Meet the builder <span aria-hidden="true">↗</span></Link></div><div className="manifesto-mark" aria-hidden="true">+</div></section>
 </>;
}
