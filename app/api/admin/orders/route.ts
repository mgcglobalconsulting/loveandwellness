import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

async function getAdminUser() {
  const authSupabase = await createClient();
  const {
    data: { user },
  } = await authSupabase.auth.getUser();

  if (!user) return { user: null, error: "Unauthorized", status: 401 };

  const { data: profile } = await authSupabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return { user: null, error: "Forbidden", status: 403 };
  }

  return { user, error: null, status: 200 };
}

export async function GET(request: Request) {
  try {
    const { error, status } = await getAdminUser();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");

    const supabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter) {
      query = query.eq("status", statusFilter);
    }

    const { data, error: dbError } = await query;

    if (dbError) {
      console.error("Orders fetch error:", dbError);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }

    return NextResponse.json({ orders: data });
  } catch (err) {
    console.error("Admin orders GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { error, status } = await getAdminUser();
    if (error) {
      return NextResponse.json({ error }, { status });
    }

    const body = await request.json();
    const { id, status: newStatus } = body;

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const validStatuses = ["pending", "paid", "fulfilled", "refunded"];
    if (!newStatus || !validStatuses.includes(newStatus)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const supabase = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error: dbError } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id)
      .select()
      .single();

    if (dbError) {
      console.error("Order update error:", dbError);
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }

    return NextResponse.json({ order: data });
  } catch (err) {
    console.error("Admin orders PATCH error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
