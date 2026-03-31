"use client";

import { useState } from "react";
import { CountdownTimer } from "./CountdownTimer";
import { getNextWebinarTime } from "@/lib/utils";
import { Loader2, Check, Calendar } from "lucide-react";

export function WebinarRegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextSession] = useState(() => getNextWebinarTime());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // Register as lead + webinar registration
      await Promise.all([
        fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, full_name: name, source: "webinar" }),
        }),
        fetch("/api/webinars/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, full_name: name, webinar_type: "daily" }),
        }),
      ]);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-3xl p-8 text-center"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="w-16 h-16 rounded-full bg-primary/30 border border-accent-gold flex items-center justify-center mx-auto mb-5">
          <Check size={28} className="text-accent-gold" />
        </div>
        <h3 className="font-serif text-white text-2xl mb-3">You're In!</h3>
        <p className="text-white/70 mb-6 text-sm leading-relaxed">
          Check your email for your training access link. Your session starts
          in:
        </p>
        <CountdownTimer targetDate={nextSession} variant="page" />
        <div className="mt-6 p-4 rounded-2xl bg-white/5 text-left">
          <p className="text-accent-gold text-xs font-accent uppercase tracking-wider mb-2">
            Important
          </p>
          <p className="text-white/60 text-xs leading-relaxed">
            This training contains Dr. Patricia's most powerful frameworks —
            the same ones her private clients pay thousands to access. Come
            ready to take notes and be transformed.
          </p>
        </div>
        <button className="mt-5 flex items-center gap-2 text-accent-gold text-sm font-accent mx-auto hover:underline">
          <Calendar size={14} />
          Add to my calendar
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl p-8"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <div className="text-center mb-6">
        <p className="text-accent-gold text-xs font-accent uppercase tracking-widest mb-2">
          Next Session Starts In
        </p>
        <div className="flex justify-center">
          <CountdownTimer targetDate={nextSession} variant="page" />
        </div>
      </div>

      <h3 className="text-white font-serif text-2xl text-center mb-6">
        Reserve Your Free Seat
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent-gold transition-colors text-sm"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent-gold transition-colors text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-gold w-full flex items-center justify-center gap-2 py-4 text-base font-semibold"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving your seat...
            </>
          ) : (
            "YES — Save My Free Seat →"
          )}
        </button>
        <p className="text-white/30 text-xs text-center">
          Sessions run daily, every 2 hours from 9 AM – 9 PM EST.
          <br />
          No credit card required.
        </p>
      </form>
    </div>
  );
}
