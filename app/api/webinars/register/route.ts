import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, full_name, webinar_type = "daily" } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Get active webinar of requested type
    const { data: webinar } = await supabase
      .from("webinars")
      .select("id, max_attendees")
      .eq("webinar_type", webinar_type)
      .eq("is_active", true)
      .single();

    if (!webinar) {
      return NextResponse.json({ error: "No active webinar found" }, { status: 404 });
    }

    // Check seat availability for masterclass
    if (webinar.max_attendees) {
      const { count } = await supabase
        .from("webinar_registrations")
        .select("*", { count: "exact", head: true })
        .eq("webinar_id", webinar.id);

      if (count && count >= webinar.max_attendees) {
        return NextResponse.json({ error: "This session is full" }, { status: 409 });
      }
    }

    // Register (upsert to avoid duplicates)
    const { error } = await supabase
      .from("webinar_registrations")
      .upsert(
        {
          webinar_id: webinar.id,
          email: email.toLowerCase().trim(),
          full_name: full_name || null,
          source: webinar_type,
        },
        { onConflict: "webinar_id,email", ignoreDuplicates: true }
      );

    if (error) {
      console.error("Webinar registration error:", error);
      return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }

    // Trigger email sequence
    await supabase.functions.invoke("send-webinar-confirmation", {
      body: { email, full_name, webinar_type },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Webinar register error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
