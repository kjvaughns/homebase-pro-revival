import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SITE_URL = "https://homebasepro-app.lovable.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/placeholder.svg`;

const CRAWLER_RE =
  /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|Slackbot|Discordbot|Applebot|TelegramBot|Googlebot|bingbot|PinterestBot|Embedly|Quora Link Preview|redditbot|Showyoubot|outbrain|vkShare/i;

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

Deno.serve(async (req) => {
  const url = new URL(req.url);
  // Extract slug from path: /og-meta/{slug}
  const pathParts = url.pathname.split("/").filter(Boolean);
  // Path will be like /og-meta/heritage or /functions/v1/og-meta/heritage
  const slug = pathParts[pathParts.length - 1] === "og-meta" ? "" : pathParts[pathParts.length - 1] || "";

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const canonicalUrl = `${SITE_URL}/providers/${slug}`;
  const ua = req.headers.get("user-agent") || "";

  // Real browsers → 302 redirect to the SPA
  if (!CRAWLER_RE.test(ua)) {
    return new Response(null, {
      status: 302,
      headers: { Location: canonicalUrl },
    });
  }

  // Crawler → fetch provider data and return OG HTML
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Try booking_links slug first
    const { data: blData } = await supabase
      .from("booking_links")
      .select("provider_id, custom_title, custom_description")
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();

    let providerId: string | null = blData?.provider_id || null;
    const customTitle: string | null = blData?.custom_title || null;
    const customDescription: string | null = blData?.custom_description || null;

    // Fetch provider
    let providerQuery = supabase
      .from("providers")
      .select("business_name, description, avatar_url, capability_tags, service_area, average_rating, review_count, hourly_rate");

    if (providerId) {
      providerQuery = providerQuery.eq("id", providerId);
    } else {
      providerQuery = providerQuery.eq("id", slug).eq("is_public", true);
    }

    const { data: provData } = await providerQuery.maybeSingle();

    if (!provData) {
      return serveFallbackOg(canonicalUrl);
    }

    const title = escapeHtml(customTitle || `${provData.business_name} | HomeBase`);
    const rawDesc =
      customDescription ||
      provData.description ||
      `Book ${provData.business_name} on HomeBase — your trusted home service professional.`;
    const description = escapeHtml(truncate(rawDesc, 160));
    const image = provData.avatar_url || DEFAULT_OG_IMAGE;
    const tags = (provData.capability_tags || []).slice(0, 4).join(", ");

    const html = buildOgHtml({
      title,
      description,
      image,
      url: canonicalUrl,
      businessName: escapeHtml(provData.business_name),
      serviceArea: provData.service_area ? escapeHtml(provData.service_area) : null,
      tags,
    });

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("OG meta error:", err);
    return serveFallbackOg(canonicalUrl);
  }
});

function serveFallbackOg(url: string): Response {
  const html = buildOgHtml({
    title: "HomeBase — Find Trusted Home Service Pros",
    description: "Book vetted, local home service professionals instantly with HomeBase.",
    image: DEFAULT_OG_IMAGE,
    url,
    businessName: null,
    serviceArea: null,
    tags: "",
  });
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
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
