import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");

    const supabase = await createClient();

    let query = supabase
      .from("posts")
      .select("id, title, slug, excerpt, cover_image, author_id, published_at, tags")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (tag) {
      query = query.contains("tags", [tag]);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Blog fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }

    return NextResponse.json({ posts: data ?? [] });
  } catch (err) {
    console.error("Blog route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
