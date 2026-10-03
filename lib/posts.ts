import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

export type Post = {
  slug: string; title: string; description: string; author: string;
  date: string; category: string; content: string; readingMinutes: number;
};
const directory = path.join(process.cwd(), "content/posts");
export const getPosts = cache((): Post[] => fs.readdirSync(directory)
  .filter(file => file.endsWith(".md"))
  .flatMap(file => {
    const slug = file.slice(0, -3);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid post filename: ${file}`);
    const { data, content } = matter(fs.readFileSync(path.join(directory, file), "utf8"));
    if (data.draft === true) return [];
    for (const field of ["title", "description", "author", "date", "category"]) {
      if (typeof data[field] !== "string" || !data[field].trim()) throw new Error(`${file}: missing ${field}`);
    }
    const timestamp = Date.parse(`${data.date}T12:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(timestamp) ||
      new Date(timestamp).toISOString().slice(0, 10) !== data.date) throw new Error(`${file}: invalid date; use quoted YYYY-MM-DD`);
    return [{ slug, title: data.title, description: data.description, author: data.author,
      date: data.date, category: data.category, content,
      readingMinutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)) }];
  }).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)));
export const getPost = (slug: string) => getPosts().find(post => post.slug === slug);
export const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", {
  month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
}).format(new Date(`${date}T12:00:00Z`));
