import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("applications")
      .insert({
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        relationship_status: body.relationship_status,
        biggest_challenge: body.biggest_challenge,
        already_tried: body.already_tried,
        commitment_level: parseInt(body.commitment_level),
        investment_comfort: body.investment_comfort,
        referral_source: body.referral_source || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Application insert error:", error);
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }

    // Trigger confirmation email via Supabase Edge Function
    await supabase.functions.invoke("send-application-confirmation", {
      body: { application: data },
    });

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error("Application route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let query = supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ applications: data });
}
