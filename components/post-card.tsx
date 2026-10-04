import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/posts";
export function PostCard({post}: {post: Omit<Post,"content">}) {
  return <article className="post-card">
    <Link href={`/blog/${post.slug}`} className="post-art" aria-label={`Read ${post.title}`}><Image src="/images/journal-signal.webp" alt="" fill sizes="(max-width:640px) 100vw, 280px"/><span aria-hidden="true">FIELD NOTE / {post.date.slice(0,4)}</span></Link>
    <div className="post-date"><time dateTime={post.date}>{formatDate(post.date)}</time><span>{post.readingMinutes} min read</span></div>
    <div><span className="tag">{post.category}</span><h3><Link href={`/blog/${post.slug}`} className="post-title">{post.title}<span aria-hidden="true">↗</span></Link></h3><p>{post.description}</p><span className="post-author">{post.author}</span></div>
  </article>;
}
