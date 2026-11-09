import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDate, getPost, getPosts } from "@/lib/posts";
import { Reader } from "@/components/reader";
import { Journey } from "@/components/journey";
import { ProcessNavigation, StyleTileExplorer, WeekTwoCheckpoint } from "@/components/week-two-process";
import { FoundationCards, TestResults } from "@/components/week-four-progress";

const coverDetails: Record<string, { alt: string; caption: string }> = {
  "village-outreach-week-4": {
    alt: "Handcrafted miniature houses connected to a wooden profile-record cabinet, with green check tokens representing backend testing",
    caption: "AI-generated illustration of the backend foundation and testing.",
  },
  "village-outreach-week-5": {
    alt: "Miniature houses on a frosted neighborhood map connected by brass tracks to profile and help-request cards, with a green verification token",
    caption: "AI-generated illustration of profiles, help requests, and backend verification.",
  },
  "village-outreach-week-6": {
    alt: "Two miniature houses with speech bubbles, joined by a brass path and a green checkmark",
    caption: "AI-generated illustration of a private conversation opening after the requester accepts an offer.",
  },
};
const defaultCoverDetails = {
  alt: "Illustration of a paper neighborhood surrounded by a document draft, interface sketches, and color samples on a planning worktable",
  caption: "AI-generated editorial illustration of the planning process.",
};

export const dynamicParams = false;
export function generateStaticParams() { return getPosts().map(post => ({slug:post.slug})); }
type Props = {params: Promise<{slug: string}>};
export async function generateMetadata({params}: Props): Promise<Metadata> {
 const {slug} = await params; const post = getPost(slug); if (!post) notFound();
 return {title:post.title, description:post.description, authors:[{name:post.author}], alternates:{canonical:`/blog/${post.slug}`}, openGraph:{type:"article",title:post.title,description:post.description,publishedTime:post.date,authors:[post.author]}};
}
export default async function PostPage({params}: Props) {
 const {slug} = await params; const post = getPost(slug); if (!post) notFound();
 const isWeekTwo = slug === "village-outreach-week-2";
 const isWeekFour = slug === "village-outreach-week-4";
 const cover = coverDetails[slug] ?? defaultCoverDetails;
 const headingIds: Record<string, string> = {"First design document draft":"document-draft", "UX style tile":"style-tile", "Review and project setup":"team-review", "Next week":"next-week"};
 return <article className="article"><Link href="/blog" className="text-link back-link">← All entries</Link><header className="article-header"><span className="tag">{post.category}</span><h1>{post.title}</h1><p className="article-deck">{post.description}</p><div className="article-byline"><span className="avatar" aria-hidden="true">ER</span><div><span className="author">{post.author}</span><span className="muted"><time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read</span></div></div></header>
 <Reader>
 {post.cover && <figure style={{margin:"0 0 30px"}}>
   <Image src={post.cover} alt={cover.alt} width={1672} height={941} sizes="(max-width: 850px) 100vw, 800px" style={{width:"100%",height:"auto"}} />
   <figcaption style={{fontSize:"12px",color:"var(--muted)",marginTop:"10px"}}>{cover.caption}</figcaption>
 </figure>}
 {post.slug === "starting-my-capstone-journey" && <Journey />}
 {isWeekTwo && <ProcessNavigation />}
 <div className="prose"><Markdown remarkPlugins={[remarkGfm]} components={isWeekTwo ? {
   h2({children}) {
     const heading = String(children);
     return <>
       {heading === "Review and project setup" && <StyleTileExplorer />}
       <h2 id={headingIds[heading]} style={{scrollMarginTop:"80px"}}>{children}</h2>
     </>;
   },
 } : isWeekFour ? {
   h2({children}) {
     const heading = String(children);
     return <><h2>{children}</h2>
       {heading === "From plan to implementation" && <FoundationCards />}
       {heading === "What the tests proved" && <TestResults />}
     </>;
   },
 } : undefined}>{post.content}</Markdown>
 {isWeekTwo && <WeekTwoCheckpoint />}
 </div>
 </Reader>
 <div className="article-end"><p>More project notes in the journal.</p><Link href="/blog" className="text-link">Back to all entries <span aria-hidden="true">→</span></Link></div></article>;
}
