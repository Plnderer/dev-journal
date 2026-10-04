import { FieldNote } from "@/components/field-note";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { getPosts } from "@/lib/posts";
export default function Home() {
  const posts = getPosts();
  return <>
    <section className="hero">
      <div><p className="eyebrow"><span className="status-dot" /> A WORK IN PROGRESS, BY DESIGN</p>
        <h1>Building software.<br /><span>Documenting the journey.</span></h1>
        <p className="hero-intro">I’m Eric, a computer science student turning ideas into working software. These are my notes on the process—the questions, the decisions, and the lessons along the way.</p>
        <div className="flex flex-wrap items-center gap-7"><Link href="/blog" className="button">Explore the journal <span aria-hidden="true">→</span></Link><Link href="/about" className="text-link">A little about me <span aria-hidden="true">↗</span></Link></div>
      </div>
      <FieldNote />
    </section>
    <section className="entries-section" aria-labelledby="latest"><div className="section-heading"><h2 id="latest">Latest writing<span className="count">{String(posts.length).padStart(2,"0")}</span></h2><Link href="/blog" className="text-link">All entries <span aria-hidden="true">→</span></Link></div>
      {posts.length ? posts.slice(0,3).map(post => <PostCard key={post.slug} post={post} />) : <p className="empty-state">The first entry is on its way.</p>}
    </section>
    <div className="closing-note"><span className="eyebrow">THE PURPOSE</span><p>A record of what I’m learning,<br />and how I’m putting it to work.</p><span className="muted">Project &amp; Portfolio V · Full Sail University</span></div>
  </>;
}
