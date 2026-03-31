"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";

export function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, full_name: name, source: "newsletter" }),
      });
      setSubmitted(true);
    } catch {
      // Silently handle
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0D0A14 0%, #1A0A2A 50%, #0D0A14 100%)",
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(107,45,107,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="script-accent text-accent-gold mb-3">Stay Connected</p>
          <h2 className="section-heading text-white mb-4">
            Weekly Love Letters
          </h2>
          <p className="text-white/60 mb-10 text-lg font-light">
            Insights on love, relationships, and personal growth — delivered
            with warmth by Dr. Patricia every week.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/30 border border-primary flex items-center justify-center">
                <Check size={28} className="text-accent-gold" />
              </div>
              <p className="text-white font-display text-xl">
                You're on the list!
              </p>
              <p className="text-white/60 text-sm">
                Check your inbox for a welcome note from Dr. Patricia.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Your first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-accent-gold"
                required
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-accent-gold"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-gold flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Subscribing..."
                ) : (
                  <>
                    Subscribe <Send size={15} />
                  </>
                )}
              </button>
              <p className="text-white/30 text-xs">
                No spam, ever. Unsubscribe any time.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
