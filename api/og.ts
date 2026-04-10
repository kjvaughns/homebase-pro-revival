import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

const supabaseUrl = "https://yvedkmtjynhgsuxukxjj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZWRrbXRqeW5oZ3N1eHVreGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1Mjk4MjUsImV4cCI6MjA4NTEwNTgyNX0.ynltAo8KM4HuBzO5hyfkjlkVonuJUaUFp0djpArhhnY";

const SITE_URL = "https://homebaseproapp.com";

const CRAWLER_UA =
  /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Googlebot|bingbot|iMessageLinkPreviewer|Applebot/i;

function isCrawler(ua: string | undefined): boolean {
  return !!ua && CRAWLER_UA.test(ua);
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slug = (req.query.slug as string) || "";
  const ua = req.headers["user-agent"] || "";

  if (!slug || !isCrawler(ua)) {
    // Serve the SPA index.html for real browsers
    try {
      const html = readFileSync(join(process.cwd(), "dist", "index.html"), "utf-8");
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(html);
    } catch {
      return res.redirect(302, `${SITE_URL}/providers/${slug}`);
    }
  }

  // Crawler path: fetch provider data
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: bl } = await supabase
    .from("booking_links")
    .select("provider_id, custom_title")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  let provider: any = null;

  if (bl) {
    const { data } = await supabase
      .from("providers")
      .select("business_name, description, avatar_url, service_area, capability_tags")
      .eq("id", bl.provider_id)
      .single();
    provider = data;
  } else {
    // Try slug as provider slug
    const { data } = await supabase
      .from("providers")
      .select("business_name, description, avatar_url, service_area, capability_tags")
      .eq("slug", slug)
      .eq("is_public", true)
      .maybeSingle();
    provider = data;
  }

  const title = provider
    ? `${bl?.custom_title || provider.business_name} | HomeBase`
    : "HomeBase — Find Trusted Home Service Pros";

  const description = provider?.description
    ? provider.description.slice(0, 160)
    : "Book trusted home service professionals on HomeBase.";

  const image = provider?.avatar_url || `${SITE_URL}/placeholder.svg`;
  const url = `${SITE_URL}/providers/${slug}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="${esc(url)}"/>
  <meta property="og:title" content="${esc(title)}"/>
  <meta property="og:description" content="${esc(description)}"/>
  <meta property="og:image" content="${esc(image)}"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${esc(title)}"/>
  <meta name="twitter:description" content="${esc(description)}"/>
  <meta name="twitter:image" content="${esc(image)}"/>
  <meta http-equiv="refresh" content="0;url=${esc(url)}"/>
</head>
<body>
  <p>Redirecting to <a href="${esc(url)}">${esc(title)}</a></p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).send(html);
}
