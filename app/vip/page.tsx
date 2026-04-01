import Link from "next/link";
import { Check, Shield, Star, Heart, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIP Coaching — Dr. Patricia George",
  description:
    "Private, high-level coaching with Dr. Patricia George. A complete paradigm shift for those ready for real clarity, deep healing, and lasting relational transformation.",
};

export default function VIPOfferPage() {
  return (
    <div className="min-h-screen bg-cream text-text-primary pt-24 pb-20">

      {/* ── HERO ── */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wide mb-6">
            <Star className="w-4 h-4 fill-current" />
            Application Approved
          </div>
          <h1 className="section-heading mb-6 text-text-primary">
            The Ultimate{" "}
            <span className="text-gradient-plum">Love & Wellness</span>{" "}
            Transformation
          </h1>
          <p className="section-subheading text-gray-600">
            You&apos;ve been accepted. Now it&apos;s time to step into the
            relationship and life you were meant for. Choose your path below.
          </p>
        </div>

        {/* ── OFFERING CARDS ── */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 animate-slide-up">

          {/* Group Coaching */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
            <div className="mb-6">
              <h2 className="text-2xl font-serif text-text-primary mb-2">
                Group Coaching Immersion
              </h2>
              <p className="text-gray-500">
                An 8-week profound journey with a curated circle of women.
              </p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "8 Weeks of Live Group Coaching calls",
                "Private Community Support Chat",
                "Complete Relationship Audit & Roadmap",
                "Access to the VIP Vault of resources",
                "Group healing and accountability sessions",
                "Priority support between calls",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-teal-deep shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/apply"
              className="btn-outline border-primary text-primary hover:bg-primary/5 w-full inline-flex items-center justify-center gap-2"
            >
              Apply for Group Coaching
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* VIP Intensive Day */}
          <div
            className="glass-light rounded-3xl p-8 lg:p-10 border border-accent-rose/40 flex flex-col relative overflow-hidden transform md:-translate-y-4"
            style={{ boxShadow: "0 20px 60px rgba(232,160,160,0.2)" }}
          >
            <div
              className="absolute top-0 inset-x-0 h-1 rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, #E8A0A0, #D4AF6A)" }}
            />
            <div className="absolute -top-4 -right-4 bg-accent-gold text-midnight text-xs font-bold px-8 py-2 rotate-45 transform origin-bottom-right uppercase tracking-wider">
              Highest Value
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-serif text-primary mb-2">
                The VIP Intensive Day
              </h2>
              <p className="text-gray-600">
                1-on-1 private access. A complete paradigm shift.
              </p>
            </div>

            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent-rose fill-current" />
              What&apos;s Included
            </h4>
            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Full-day private session with Dr. Patricia",
                "Deep exploration of limiting beliefs & relational patterns",
                "Custom relationship strategy & healing protocol",
                "30 days of private Voxer/WhatsApp access",
                "2 follow-up integration calls (45 mins each)",
                <span key="gift" className="font-semibold text-primary">
                  Physical VIP Gift Box — shipped directly to you
                </span>,
                <span key="vault" className="font-semibold text-primary">
                  Lifetime access to the Masterclass Library
                </span>,
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/apply"
              className="btn-primary w-full shadow-glow inline-flex items-center justify-center gap-2"
            >
              Apply for VIP Day
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" /> Investment details shared upon
              application review
            </p>
          </div>
        </div>
      </section>

      {/* ── VIP GIFT BOX ── */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-2xl font-serif text-primary mb-4">
            What&apos;s in the VIP Stacked Gift Box?
          </h3>
          <p className="text-gray-600 mb-12 max-w-lg mx-auto">
            Every VIP client receives a curated physical package to support and
            celebrate their journey.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Branded Journal", emoji: "📓" },
              { label: "Rose & Lavender Candle", emoji: "🕯️" },
              { label: "Healing Crystals", emoji: "💎" },
              { label: "30-Day Devotional", emoji: "📖" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl"
                style={{ background: "#FAF6F1" }}
              >
                <span className="text-4xl">{item.emoji}</span>
                <span className="font-medium text-text-primary text-sm text-center">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <p
            className="script-accent text-primary mb-3"
            style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}
          >
            Ready to begin?
          </p>
          <h2 className="text-3xl font-serif text-text-primary mb-4">
            Start with the Free Training
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Not sure which path is right for you? Begin with Dr. Patricia&apos;s
            free training and she will guide you from there.
          </p>
          <Link href="/webinar" className="btn-gold">
            Join the Free Training →
          </Link>
        </div>
      </section>
    </div>
  );
}
