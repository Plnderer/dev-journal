import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { Journey } from "@/components/journey";
export const dynamicParams = false;
export function generateStaticParams() { return getPosts().map(post => ({slug:post.slug})); }
type Props = {params: Promise<{slug: string}>};
export async function generateMetadata({params}: Props): Promise<Metadata> {
 const {slug} = await params; const post = getPost(slug); if (!post) notFound();
 return {title:post.title, description:post.description, authors:[{name:post.author}], alternates:{canonical:`/blog/${post.slug}`}, openGraph:{type:"article",title:post.title,description:post.description,publishedTime:post.date,authors:[post.author]}};
}
export default async function PostPage({params}: Props) {
 const {slug} = await params; const post = getPost(slug); if (!post) notFound();
 return <article className="article"><Link href="/blog" className="text-link back-link">← All entries</Link><header className="article-header"><span className="tag">{post.category}</span><h1>{post.title}</h1><p className="article-deck">{post.description}</p><div className="article-byline"><span className="avatar" aria-hidden="true">ER</span><div><span className="author">{post.author}</span><span className="muted"><time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read</span></div></div></header>
 {post.slug === "starting-my-capstone-journey" && <Journey />}
 <div className="prose"><Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown></div>
 <div className="article-end"><p>Thanks for following the journey.</p><Link href="/blog" className="text-link">Back to all entries <span aria-hidden="true">→</span></Link></div></article>;
}
