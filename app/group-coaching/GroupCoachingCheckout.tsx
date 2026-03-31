"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Shield } from "lucide-react";

export default function GroupCoachingCheckout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_key: "group_coaching" }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Unable to start checkout. Please try again.");
        return;
      }

      router.push(data.url);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none text-lg py-5"
      >
        {loading ? (
          <span className="flex items-center gap-2 justify-center">
            <span className="w-4 h-4 border-2 border-midnight/40 border-t-midnight rounded-full animate-spin" />
            Redirecting to Checkout…
          </span>
        ) : (
          <span className="flex items-center gap-2 justify-center">
            <Heart className="w-5 h-5 fill-current" />
            Join the Love Circle
          </span>
        )}
      </button>

      {error && (
        <p className="text-red-400 text-sm text-center bg-red-500/10 px-4 py-3 rounded-xl border border-red-400/20">
          {error}
        </p>
      )}

      <p className="text-center text-gray-500 text-xs flex items-center justify-center gap-1.5">
        <Shield className="w-3 h-3" />
        Secure Stripe Checkout — payment plans available at checkout
      </p>
    </div>
  );
}
