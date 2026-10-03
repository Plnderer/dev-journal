import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";
export function PostCard({post}: {post: Post}) {
  return <article className="post-card">
    <div className="post-date"><time dateTime={post.date}>{formatDate(post.date)}</time><span>{post.readingMinutes} min read</span></div>
    <div><span className="tag">{post.category}</span><h3><Link href={`/blog/${post.slug}`} className="post-title">{post.title}<span aria-hidden="true">↗</span></Link></h3><p>{post.description}</p><span className="post-author">{post.author}</span></div>
  </article>;
}
