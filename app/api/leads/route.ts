import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, full_name, source } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Upsert — don't duplicate if same email
    const { data, error } = await supabase
      .from("leads")
      .upsert(
        {
          email: email.toLowerCase().trim(),
          full_name: full_name || null,
          source: source || "newsletter",
        },
        { onConflict: "email", ignoreDuplicates: true }
      )
      .select()
      .single();

    if (error && error.code !== "23505") {
      console.error("Lead insert error:", error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    // Trigger welcome email
    if (data) {
      await supabase.functions.invoke("send-welcome-email", {
        body: { lead: data },
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Leads route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
