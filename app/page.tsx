import { FieldNote } from "@/components/field-note";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { getPosts } from "@/lib/posts";
export default function Home() {
 const posts=getPosts();
 return <>
  <section className="hero">
    <FieldNote />
    <div className="hero-copy"><p className="eyebrow"><span className="status-dot"/> INDEPENDENT MIND. OPEN JOURNAL.</p>
      <h1>BUILD.<br/><span>BREAK.</span><br/>BECOME.</h1>
      <p className="hero-intro">Eric Reyes. Exploring software, AI, and the space between an idea and something real.</p>
      <div className="hero-links"><Link href="/blog" className="button">Enter the journal <span aria-hidden="true">↗</span></Link><Link href="/about" className="text-link">Meet the builder <span aria-hidden="true">→</span></Link></div>
    </div>
    <div className="hero-caption"><span>FIELD NOTES / VOL. 01</span><span>LEARNING IN PUBLIC</span></div>
  </section>
  <div className="discipline-strip" aria-label="Journal interests"><span>SOFTWARE</span><i aria-hidden="true">✳</i><span>ARTIFICIAL INTELLIGENCE</span><i aria-hidden="true">✳</i><span>EXPERIMENTS</span><i aria-hidden="true">✳</i><span>HUMAN CURIOSITY</span></div>
  <section className="entries-section" aria-labelledby="latest"><div className="section-heading"><h2 id="latest"><span className="status-dot"/> Latest transmission <span className="count">{String(posts.length).padStart(2,"0")}</span></h2><Link href="/blog" className="text-link">View journal <span aria-hidden="true">↗</span></Link></div>
    {posts.length ? posts.slice(0,3).map(post=><PostCard key={post.slug} post={post}/>) : <p className="empty-state">The first entry is on its way.</p>}
  </section>
  <section className="manifesto"><div><span className="eyebrow">THE MISFIT MINDSET</span><h2>Curiosity<br/>without <em>limits.</em></h2></div><div><p>Think independently. Build with purpose. Document the messy middle.</p><p className="muted">This is a record of my development journey—the questions, the decisions, and what happens when theory meets practice.</p><Link href="/about" className="text-link">More about Eric ↗</Link></div><span className="manifesto-mark" aria-hidden="true">✳</span></section>
 </>;
}
