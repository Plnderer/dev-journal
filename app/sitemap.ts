import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
 return ["", "/blog", "/about"].map(route => ({url:`${siteUrl}${route}`})).concat(getPosts().map(post => ({url:`${siteUrl}/blog/${post.slug}`})));
}
