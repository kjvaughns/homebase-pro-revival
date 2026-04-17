// Process a marketplace booking_request:
// - Looks up the provider
// - Creates an appointment row (so it shows in the provider portal)
// - Creates a notifications row for the provider's user
// - Updates booking_requests.status -> "processed" with linked appointment_id
//
// Email sending is intentionally NOT included yet — it requires an email
// domain to be configured. Once configured, this function can call
// `send-transactional-email` for customer + provider notifications.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  bookingRequestId: string;
}

// Map "Morning (8am-12pm)" / "Afternoon (12pm-5pm)" / "Evening (5pm-8pm)"
// or a literal time like "10:00 AM" -> a 24h "HH:MM:SS" string.
function normalizeTime(preferredTime: string | null): string {
  if (!preferredTime) return "09:00:00";
  const lower = preferredTime.toLowerCase();
  if (lower.includes("morning")) return "09:00:00";
  if (lower.includes("afternoon")) return "13:00:00";
  if (lower.includes("evening")) return "17:00:00";

  // Try parse "10:00 AM" / "1:30 PM"
  const m = preferredTime.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (m) {
    let h = parseInt(m[1], 10);
    const min = m[2];
    const ap = m[3].toUpperCase();
    if (ap === "PM" && h < 12) h += 12;
    if (ap === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${min}:00`;
  }
  return "09:00:00";
}

function buildScheduledDate(date: string | null, time: string | null): string {
  // appointments.scheduled_date is `timestamp without time zone`
  const d = date ?? new Date().toISOString().split("T")[0];
  const t = normalizeTime(time);
  return `${d}T${t}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { bookingRequestId } = (await req.json()) as RequestBody;

    if (!bookingRequestId) {
      return new Response(
        JSON.stringify({ error: "bookingRequestId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1. Load the booking_request
    const { data: br, error: brErr } = await supabase
      .from("booking_requests")
      .select("*")
      .eq("id", bookingRequestId)
      .maybeSingle();

    if (brErr || !br) {
      console.error("booking_request lookup failed", brErr);
      return new Response(
        JSON.stringify({ error: "Booking request not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (br.appointment_id) {
      // Already processed — idempotent no-op
      return new Response(
        JSON.stringify({ ok: true, appointmentId: br.appointment_id, alreadyProcessed: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!br.provider_id) {
      return new Response(
        JSON.stringify({ error: "Booking request is missing provider_id" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 2. Load the provider (need user_id + email for notifications)
    const { data: provider, error: provErr } = await supabase
      .from("providers")
      .select("id, user_id, business_name, email")
      .eq("id", br.provider_id)
      .maybeSingle();

    if (provErr || !provider) {
      console.error("provider lookup failed", provErr);
      return new Response(
        JSON.stringify({ error: "Provider not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 3. Create appointment
    const scheduledDate = buildScheduledDate(br.preferred_date, br.preferred_time);
    const serviceName =
      (br.service_summary && br.service_summary.length > 80
        ? br.service_summary.slice(0, 77) + "..."
        : br.service_summary) ||
      br.provider_category ||
      "Marketplace booking";

    const description = [
      `Marketplace booking from ${br.customer_name}`,
      br.customer_phone ? `Phone: ${br.customer_phone}` : null,
      br.customer_email ? `Email: ${br.customer_email}` : null,
      br.customer_address ? `Address: ${br.customer_address}` : null,
      br.preferred_time ? `Preferred time: ${br.preferred_time}` : null,
      br.notes ? `Notes: ${br.notes}` : null,
      br.service_summary ? `\nService request:\n${br.service_summary}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const { data: appt, error: apptErr } = await supabase
      .from("appointments")
      .insert({
        provider_id: provider.id,
        service_name: serviceName,
        scheduled_date: scheduledDate,
        scheduled_time: br.preferred_time ?? null,
        status: "pending",
        urgency: "flexible",
        description,
        notes: br.notes ?? null,
        job_summary: br.service_summary ?? null,
      })
      .select("id")
      .single();

    if (apptErr || !appt) {
      console.error("appointment insert failed", apptErr);
      return new Response(
        JSON.stringify({ error: "Failed to create appointment", detail: apptErr?.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 4. Create notification for provider's user (if linked)
    if (provider.user_id) {
      const { error: notifErr } = await supabase.from("notifications").insert({
        user_id: provider.user_id,
        type: "new_booking",
        title: "New booking request",
        message: `${br.customer_name} requested ${serviceName}${
          br.preferred_date ? ` on ${br.preferred_date}` : ""
        }${br.preferred_time ? ` (${br.preferred_time})` : ""}.`,
        data: JSON.stringify({
          appointment_id: appt.id,
          booking_request_id: br.id,
          customer_name: br.customer_name,
          customer_phone: br.customer_phone,
          customer_email: br.customer_email,
        }),
      });
      if (notifErr) {
        // Non-fatal — log and continue
        console.error("notification insert failed", notifErr);
      }
    }

    // 5. Link appointment back to booking_request
    const { error: updateErr } = await supabase
      .from("booking_requests")
      .update({ appointment_id: appt.id, status: "processed" })
      .eq("id", br.id);
    if (updateErr) {
      console.error("booking_requests update failed", updateErr);
    }

    return new Response(
      JSON.stringify({ ok: true, appointmentId: appt.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("process-booking-request error", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message ?? "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
