import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const PRICE_MAP: Record<string, string> = {
  vip_day: process.env.STRIPE_PRICE_VIP_DAY!,
  group_coaching: process.env.STRIPE_PRICE_GROUP_COACHING!,
  masterclass: process.env.STRIPE_PRICE_MASTERCLASS!,
};

export async function POST(request: Request) {
  try {
    const { product_key, metadata = {} } = await request.json();

    const priceId = PRICE_MAP[product_key];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/vip`,
      customer_email: user?.email,
      metadata: {
        product_key,
        user_id: user?.id || "guest",
        ...metadata,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
