import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      amount: unknown;
      donor_name?: string;
      donor_email?: string;
      message?: string;
      is_anonymous?: boolean;
    };

    const { amount, donor_name, donor_email, message, is_anonymous } = body;

    if (typeof amount !== "number" || isNaN(amount) || amount < 5) {
      return NextResponse.json(
        { error: "Amount must be a number of at least $5" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Donation to Love & Wellness Coaching" },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate`,
      customer_email: donor_email || undefined,
      metadata: {
        donor_name: donor_name || "",
        donor_email: donor_email || "",
        message: message || "",
        is_anonymous: String(is_anonymous ?? false),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Donation checkout error:", err);
    return NextResponse.json({ error: "Failed to create donation session" }, { status: 500 });
  }
}
