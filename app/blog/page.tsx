import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { getPosts } from "@/lib/posts";
export const metadata: Metadata = { title: "Blog", description: "Development notes, project decisions, and lessons learned by Eric Joel Reyes Rivera.", alternates: {canonical: "/blog"} };
export default function Blog() {
 const posts = getPosts();
 return <><header className="page-heading"><p className="eyebrow">THE DEVELOPMENT JOURNAL</p><h1>Notes along the way.</h1><p>From the first idea to the next iteration. A growing collection of decisions, challenges, and lessons from building software.</p></header><section aria-label="All blog entries"><div className="section-heading"><h2>All entries <span className="count">{String(posts.length).padStart(2,"0")}</span></h2><span className="mono muted text-xs">NEWEST FIRST</span></div>{posts.length ? posts.map(post => <PostCard key={post.slug} post={post}/>) : <p className="empty-state">The first entry is on its way.</p>}</section><p className="archive-note">One entry at a time. More to come as the project takes shape.</p></>;
}
