export const site = {
  name: "Eric Reyes — Development Journal",
  author: "Eric Reyes",
  description: "Notes on building software, solving problems, and learning along the way. A development journal by Eric Reyes.",
  github: "https://github.com/Plnderer",
};
export const siteUrl = process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` :
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
