export const site = {
  name: "Eric Reyes — Development Journal",
  author: "Eric Reyes",
  description: "I’m Eric Reyes, a Computer Science student. These are my notes on what I’m building, testing, and learning in Project & Portfolio V.",
  github: "https://github.com/Plnderer",
};
export const siteUrl = process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` :
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
