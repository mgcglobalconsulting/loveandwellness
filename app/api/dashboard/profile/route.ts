import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const updateProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
});

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { full_name, phone } = parsed.data;

    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          full_name,
          phone: phone || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select("id, full_name, phone, updated_at")
      .single();

    if (error) {
      console.error("Profile update error:", error);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, profile: data });
  } catch (err) {
    console.error("Profile route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
