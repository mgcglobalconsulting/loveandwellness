import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;
    }
    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.error("Payment failed:", intent.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = getSupabase();
  const { product_key, user_id } = session.metadata || {};

  // Create order record
  await supabase.from("orders").insert({
    user_id: user_id !== "guest" ? user_id : null,
    email: session.customer_email,
    stripe_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent as string,
    total_amount: (session.amount_total || 0) / 100,
    status: "paid",
    order_type: product_key || "unknown",
    items: { product_key, price_id: session.metadata?.price_id },
  });

  // Trigger post-purchase email
  await supabase.functions.invoke("send-purchase-confirmation", {
    body: {
      email: session.customer_email,
      product_key,
      session_id: session.id,
    },
  });
}
