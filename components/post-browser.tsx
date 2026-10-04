"use client";
import { useState } from "react";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/posts";
export type PostSummary = Omit<Post,"content">;
export function PostBrowser({posts}: {posts: PostSummary[]}) {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All");
  const categories = ["All", ...new Set(posts.map(post=>post.category))];
  const normalized = query.trim().toLowerCase();
  const visible = posts.filter(post => (category === "All" || category === post.category) &&
    `${post.title} ${post.description} ${post.category}`.toLowerCase().includes(normalized));
  return <section aria-label="All blog entries">
    <div className="blog-controls"><label className="search-label"><span className="eyebrow">FIND AN ENTRY</span><span className="search-box"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search the journal…" aria-label="Search blog entries" /></span></label>
      <div className="category-filters" role="group" aria-label="Filter by category">{categories.map(item=><button type="button" key={item} aria-pressed={item===category} onClick={()=>setCategory(item)}>{item}</button>)}</div>
    </div>
    <div className="section-heading"><h2>All entries <span className="count">{String(visible.length).padStart(2,"0")}</span></h2><span className="mono muted text-xs" role="status">{visible.length} {visible.length===1 ? "ENTRY" : "ENTRIES"}</span></div>
    {visible.length ? visible.map(post=><PostCard key={post.slug} post={post}/>) : <div className="empty-state"><p>No entries match your search.</p><button type="button" className="text-link" onClick={()=>{setQuery("");setCategory("All");}}>Clear filters →</button></div>}
  </section>;
}
