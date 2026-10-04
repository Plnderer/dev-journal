import type { Metadata } from "next";
import { PostBrowser } from "@/components/post-browser";
import { getPosts } from "@/lib/posts";
export const metadata: Metadata = { title: "Blog", description: "Development notes, project decisions, and lessons learned by Eric Reyes.", alternates: {canonical: "/blog"} };
export default function Blog() {
 const posts = getPosts();
 return <><header className="page-heading"><p className="eyebrow">THE DEVELOPMENT JOURNAL</p><h1>Notes along the way.</h1><p>From the first idea to the next iteration. A growing collection of decisions, challenges, and lessons from building software.</p></header><PostBrowser posts={posts.map(({content, ...summary})=>summary)} /><p className="archive-note">One entry at a time. More to come as the project takes shape.</p></>;
}
