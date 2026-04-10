import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

async function callAI(systemPrompt: string, userPrompt: string, tools?: any[], toolChoice?: any) {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

  const body: any = {
    model: "google/gemini-3-flash-preview",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  };
  if (tools) {
    body.tools = tools;
    body.tool_choice = toolChoice;
  }

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.status === 429) throw new Error("RATE_LIMITED");
  if (res.status === 402) throw new Error("PAYMENT_REQUIRED");
  if (!res.ok) {
    const t = await res.text();
    console.error("AI gateway error:", res.status, t);
    throw new Error(`AI gateway error ${res.status}`);
  }

  const data = await res.json();
  const msg = data.choices?.[0]?.message;

  if (msg?.tool_calls?.[0]?.function?.arguments) {
    return JSON.parse(msg.tool_calls[0].function.arguments);
  }
  // Fallback: try parsing content as JSON
  if (msg?.content) {
    try {
      return JSON.parse(msg.content);
    } catch {
      return msg.content;
    }
  }
  throw new Error("No usable response from AI");
}

async function handleAnalyze(problemText: string) {
  const tools = [
    {
      type: "function",
      function: {
        name: "analyze_problem",
        description: "Analyze a home maintenance problem and return structured data",
        parameters: {
          type: "object",
          properties: {
            category: { type: "string", description: "Service category (e.g. Plumbing, Electrical, HVAC, Cleaning, Landscaping, Roofing, Pest Control, Carpentry, General)" },
            confidence: { type: "number", description: "Confidence 0-1" },
            summary: { type: "string", description: "Brief summary of the issue" },
            severity: { type: "string", enum: ["low", "medium", "high", "emergency"] },
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  question: { type: "string" },
                  type: { type: "string", enum: ["yes_no", "single_choice", "multi_choice", "number", "text"] },
                  options: { type: "array", items: { type: "string" } },
                },
                required: ["id", "question", "type"],
              },
            },
            estimatedPriceRange: { type: "string", description: "e.g. $100-$300" },
          },
          required: ["category", "confidence", "summary", "severity", "questions", "estimatedPriceRange"],
          additionalProperties: false,
        },
      },
    },
  ];

  return await callAI(
    `You are a home services diagnostic AI. Analyze the homeowner's problem description and generate:
- A category for the issue
- A confidence score
- A brief summary
- Severity level
- 3-5 diagnostic questions to better understand the problem. Choose the BEST type for each question:
  - yes_no: ONLY for strict yes/no questions (e.g. "Is there visible damage?")
  - single_choice: for questions with a finite set of answers. ALWAYS include an options array with 2-5 choices. Use this when the answer can be one of several specific options (e.g. "Where is the leak?" → ["Faucet", "Drain pipe", "Wall connection", "Not sure"])
  - text: ONLY for truly open-ended questions where you cannot predict the answers (e.g. "Describe any unusual sounds you're hearing")
  - number: for numeric answers (e.g. "How many drips per minute?")
  Prefer single_choice over text whenever the possible answers can be listed. Give each question a unique id like "q1", "q2", etc.
- An estimated price range`,
    `Problem: ${problemText}`,
    tools,
    { type: "function", function: { name: "analyze_problem" } }
  );
}

async function handleRefine(originalAnalysis: any, answers: any[]) {
  const tools = [
    {
      type: "function",
      function: {
        name: "refine_analysis",
        description: "Refine a home service analysis based on follow-up answers",
        parameters: {
          type: "object",
          properties: {
            refinedSummary: { type: "string" },
            severity: { type: "string", enum: ["low", "medium", "high", "emergency"] },
            recommendedUrgency: { type: "string", enum: ["Flexible", "Soon", "Urgent", "Emergency"] },
            scopeOfWork: { type: "array", items: { type: "string" } },
            serviceOptions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  priceRange: { type: "string" },
                  timeEstimate: { type: "string" },
                  recommended: { type: "boolean" },
                  includedItems: { type: "array", items: { type: "string" } },
                },
                required: ["title", "description", "priceRange", "timeEstimate"],
              },
            },
            materialEstimate: { type: "string" },
            timeEstimate: { type: "string" },
            confidence: { type: "number" },
          },
          required: ["refinedSummary", "severity", "recommendedUrgency", "scopeOfWork", "serviceOptions", "materialEstimate", "timeEstimate", "confidence"],
          additionalProperties: false,
        },
      },
    },
  ];

  const answersText = answers.map((a) => `Q: ${a.question}\nA: ${a.answer}`).join("\n\n");

  return await callAI(
    `You are a home services estimation AI. Based on the initial analysis and follow-up answers, provide a refined estimate with:
- A refined summary of the problem
- Severity and urgency levels
- Scope of work items (3-5 bullet points)
- 3 service options (Basic, Standard, Premium) with prices, time estimates, and included items. Mark one as recommended.
- Material and time estimates`,
    `Original Analysis:\nCategory: ${originalAnalysis.category}\nSummary: ${originalAnalysis.summary}\nSeverity: ${originalAnalysis.severity}\n\nFollow-up Answers:\n${answersText}`,
    tools,
    { type: "function", function: { name: "refine_analysis" } }
  );
}

async function handleMatchProviders(category: string) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const sb = createClient(supabaseUrl, supabaseKey);

  const { data: providers } = await sb
    .from("providers")
    .select("id, business_name, avatar_url, average_rating, review_count, capability_tags, is_verified, slug")
    .eq("is_public", true)
    .eq("is_active", true)
    .limit(5);

  if (providers && providers.length > 0) {
    return providers.map((p: any) => ({
      id: p.id,
      business_name: p.business_name,
      name: p.business_name,
      avatar_url: p.avatar_url,
      rating: p.average_rating || 4.5,
      review_count: p.review_count || 0,
      category: category,
      verified: p.is_verified || false,
      slug: p.slug,
    }));
  }

  // Fallback mock providers
  return [
    { id: "mock-1", business_name: "Marcus Johnson", name: "Marcus Johnson", rating: 4.9, review_count: 127, category, verified: true },
    { id: "mock-2", business_name: "Sarah Chen", name: "Sarah Chen", rating: 4.7, review_count: 89, category, verified: true },
    { id: "mock-3", business_name: "Mike Torres", name: "Mike Torres", rating: 4.8, review_count: 203, category, verified: true },
  ];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();

    let result;
    switch (action) {
      case "analyze":
        result = await handleAnalyze(params.problemText);
        break;
      case "refine":
        result = await handleRefine(params.originalAnalysis, params.answers);
        break;
      case "match-providers":
        result = await handleMatchProviders(params.category);
        break;
      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("ai-intake error:", e);

    if (e.message === "RATE_LIMITED") {
      return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (e.message === "PAYMENT_REQUIRED") {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: e.message || "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
