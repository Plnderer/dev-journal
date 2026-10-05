import type { Metadata } from "next";
import { PostBrowser } from "@/components/post-browser";
import { getPosts } from "@/lib/posts";
export const metadata: Metadata = { title: "Blog", description: "Project notes, development steps, and results by Eric Reyes.", alternates: {canonical: "/blog"} };
export default function Blog() {
 const posts = getPosts();
 return <><header className="page-heading"><p className="eyebrow">THE DEVELOPMENT JOURNAL</p><h1>Project notes.</h1><p>What I’m working on, what I tried, and what I learned. Each entry explains a problem or feature and the steps I took.</p></header><PostBrowser posts={posts.map(({content, ...summary})=>summary)} /><p className="archive-note">I’ll add notes as I build, test, and make changes.</p></>;
}
