"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Check, Sparkles } from "lucide-react";
import { CountdownTimer } from "@/components/webinar/CountdownTimer";
import { getNextWebinarTime } from "@/lib/utils";
import { useState } from "react";

const bullets = [
  "The 3 secrets to attracting lasting, intentional love",
  "Why most people stay stuck in the same patterns — and how to break them",
  "Dr. Patricia's personal transformation story and the method she used",
  "The exact framework she uses with her private coaching clients",
];

export function WebinarCTA() {
  const [nextSession] = useState(() => getNextWebinarTime());

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #FAF6F1 0%, #F5D5D5 30%, #E8D5F0 60%, #FAF6F1 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-accent font-semibold tracking-wide uppercase mb-6">
              <Play size={10} className="fill-current" />
              Free Daily Training
            </div>
            <h2 className="section-heading text-text-primary mb-5">
              40–90 Minutes That Could{" "}
              <span className="text-gradient-plum">Change Everything</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Join Dr. Patricia for a live training experience that gives you
              the clarity, tools, and inspiration to finally create the love
              life you've been dreaming of. No fluff, no filler — just
              transformation.
            </p>
            <ul className="space-y-4 mb-10">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mb-2 font-accent uppercase tracking-wider">
              Next session starts in:
            </p>
            <CountdownTimer targetDate={nextSession} variant="page" />
            <div className="mt-8">
              <Link href="/webinar" className="btn-primary">
                Reserve My Free Seat
              </Link>
              <p className="mt-3 text-xs text-gray-400 font-accent">
                Sessions run daily, every 2 hours from 9 AM – 9 PM EST
              </p>
            </div>
          </motion.div>

          {/* Right — masterclass teaser card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="rounded-3xl p-8 md:p-10 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0D0A14 0%, #1A0A2A 50%, #0A1A20 100%)",
              }}
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, #9B4F9B, transparent)" }} />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-accent-gold text-xs font-accent uppercase tracking-widest mb-6">
                  <Sparkles size={12} />
                  Every Friday · 7–10 PM EST
                  <Sparkles size={12} />
                </div>
                <h3 className="font-serif text-3xl mb-4">
                  The Love & Wellness Masterclass Experience
                </h3>
                <p className="text-white/65 mb-6 leading-relaxed">
                  A curated 3-hour evening for 20 serious women ready to
                  transform their love life. Not a webinar. An experience.
                </p>
                <ul className="space-y-3 mb-8 text-sm text-white/75">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent-gold" />
                    7:00 PM — Welcome & Intention Setting
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent-gold" />
                    7:15 PM — Deep-Dive Teaching
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent-gold" />
                    9:00 PM — Offer Presentation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent-gold" />
                    9:30 PM — Live Q&A with Dr. Patricia
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-accent-gold text-xs font-accent uppercase tracking-wider">
                      Limited to 20 seats
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">
                      By pre-qualification only
                    </p>
                  </div>
                  <Link href="/masterclass" className="btn-gold text-sm px-6 py-3">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
