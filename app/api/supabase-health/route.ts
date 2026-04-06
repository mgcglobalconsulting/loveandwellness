import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const missing: string[] = [];
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (missing.length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Supabase environment variables are missing",
        missing,
      },
      { status: 500 }
    );
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("applications").select("id").limit(1);

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message: "Failed to query Supabase applications table",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, message: "Supabase environment and connectivity are healthy" });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Unexpected error while checking Supabase connectivity",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
