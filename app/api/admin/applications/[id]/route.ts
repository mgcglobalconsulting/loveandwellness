import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check — must be admin
    const authSupabase = await createClient();
    const {
      data: { user },
    } = await authSupabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await authSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const allowedFields: Record<string, unknown> = {};

    if (body.status !== undefined) {
      const validStatuses = ["pending", "approved", "not_a_fit", "follow_up"];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
      }
      allowedFields.status = body.status;
    }

    if (body.admin_notes !== undefined) {
      allowedFields.admin_notes = body.admin_notes;
    }

    // Always stamp reviewed_at and reviewed_by when status changes
    if (body.status !== undefined) {
      allowedFields.reviewed_at = new Date().toISOString();
      allowedFields.reviewed_by = user.id;
    }

    if (Object.keys(allowedFields).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    // Use service role to bypass RLS for updates
    const supabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("applications")
      .update(allowedFields)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Application update error:", error);
      return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
    }

    return NextResponse.json({ application: data });
  } catch (err) {
    console.error("Admin applications PATCH error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
