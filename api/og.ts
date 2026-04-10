import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = "https://yvedkmtjynhgsuxukxjj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZWRrbXRqeW5oZ3N1eHVreGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1Mjk4MjUsImV4cCI6MjA4NTEwNTgyNX0.ynltAo8KM4HuBzO5hyfkjlkVonuJUaUFp0djpArhhnY";

const CRAWLER_RE =
  /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|Slackbot|Discordbot|Applebot|TelegramBot|Googlebot|bingbot|PinterestBot|Embedly|Quora Link Preview|redditbot|Showyoubot|outbrain|vkShare/i;

const DEFAULT_OG_IMAGE = "https://homebasepro-app.lovable.app/placeholder.svg";
const SITE_URL = "https://homebasepro-app.lovable.app";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + "…";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const slug = (req.query.slug as string) || "";
  const ua = req.headers["user-agent"] || "";
  const canonicalUrl = `${SITE_URL}/providers/${slug}`;

  // Real browsers → serve SPA
  if (!CRAWLER_RE.test(ua)) {
    // Let Vercel fall through to the SPA catch-all by serving index.html
    // We do a client-side redirect so the SPA router picks up the route
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(`<!DOCTYPE html>
<html><head>
<meta http-equiv="refresh" content="0;url=${canonicalUrl}">
<script>window.location.replace("${canonicalUrl}")</script>
</head><body></body></html>`);
  }

  // Crawler → fetch provider data and return OG HTML
  try {
    // Try booking_links slug first
    const blRes = await fetch(
      `${SUPABASE_URL}/rest/v1/booking_links?slug=eq.${encodeURIComponent(slug)}&is_active=eq.true&select=provider_id,custom_title,custom_description&limit=1`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    const blData = await blRes.json();
    let providerId: string | null = null;
    let customTitle: string | null = null;
    let customDescription: string | null = null;

    if (Array.isArray(blData) && blData.length > 0) {
      providerId = blData[0].provider_id;
      customTitle = blData[0].custom_title;
      customDescription = blData[0].custom_description;
    }

    // Fetch provider (by booking_link's provider_id, or try slug as direct ID)
    const providerFilter = providerId
      ? `id=eq.${encodeURIComponent(providerId)}`
      : `id=eq.${encodeURIComponent(slug)}&is_public=eq.true`;

    const provRes = await fetch(
      `${SUPABASE_URL}/rest/v1/providers?${providerFilter}&select=business_name,description,avatar_url,capability_tags,service_area,average_rating,review_count,hourly_rate&limit=1`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    const provData = await provRes.json();

    if (!Array.isArray(provData) || provData.length === 0) {
      return serveDefaultOg(res, canonicalUrl);
    }

    const provider = provData[0];
    const title = escapeHtml(customTitle || `${provider.business_name} | HomeBase`);
    const rawDesc =
      customDescription ||
      provider.description ||
      `Book ${provider.business_name} on HomeBase — your trusted home service professional.`;
    const description = escapeHtml(truncate(rawDesc, 160));
    const image = provider.avatar_url || DEFAULT_OG_IMAGE;
    const tags = (provider.capability_tags || []).slice(0, 4).join(", ");

    const html = buildOgHtml({
      title,
      description,
      image,
      url: canonicalUrl,
      businessName: escapeHtml(provider.business_name),
      serviceArea: provider.service_area ? escapeHtml(provider.service_area) : null,
      tags,
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).send(html);
  } catch (err) {
    console.error("OG meta error:", err);
    return serveDefaultOg(res, canonicalUrl);
  }
}

function serveDefaultOg(res: VercelResponse, url: string) {
  const html = buildOgHtml({
    title: "HomeBase — Find Trusted Home Service Pros",
    description: "Book vetted, local home service professionals instantly with HomeBase.",
    image: DEFAULT_OG_IMAGE,
    url,
    businessName: null,
    serviceArea: null,
    tags: "",
  });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.status(200).send(html);
}

interface OgData {
  title: string;
  description: string;
  image: string;
  url: string;
  businessName: string | null;
  serviceArea: string | null;
  tags: string;
}

function buildOgHtml(data: OgData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${data.title}</title>
<meta name="description" content="${data.description}">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="${data.title}">
<meta property="og:description" content="${data.description}">
<meta property="og:image" content="${data.image}">
<meta property="og:url" content="${data.url}">
<meta property="og:site_name" content="HomeBase">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${data.title}">
<meta name="twitter:description" content="${data.description}">
<meta name="twitter:image" content="${data.image}">

<link rel="canonical" href="${data.url}">
<meta http-equiv="refresh" content="0;url=${data.url}">
</head>
<body>
<h1>${data.businessName || "HomeBase"}</h1>
<p>${data.description}</p>
${data.serviceArea ? `<p>${data.serviceArea}</p>` : ""}
${data.tags ? `<p>${data.tags}</p>` : ""}
<a href="${data.url}">View Profile</a>
</body>
</html>`;
}
