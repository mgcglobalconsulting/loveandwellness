import Link from "next/link";
import { Check, ChevronDown, Heart, Shield, Star, Users } from "lucide-react";
import GroupCoachingCheckout from "./GroupCoachingCheckout";

export const metadata = {
  title: "The Love Circle — Group Coaching | Love & Wellness Coaching",
  description:
    "Join Dr. Patricia George's intimate 8-week group coaching experience. Weekly live calls, sisterhood community, guest experts, and a proven path to lasting love — at a fraction of the VIP investment.",
};

const INCLUDED_ITEMS = [
  {
    title: "Weekly Live Group Calls",
    desc: "Eight 90-minute live video calls with Dr. Patricia — intimate, high-energy, and deeply transformational. Recordings included.",
  },
  {
    title: "Private Community Access",
    desc: "A curated, high-vibe digital sisterhood for daily support, wins, breakthroughs, and accountability between sessions.",
  },
  {
    title: "Weekly Homework & Accountability",
    desc: "Structured exercises, journaling prompts, and relationship audits designed to create lasting shifts — not just inspiration.",
  },
  {
    title: "Guest Expert Sessions",
    desc: "Two bonus sessions with hand-selected guest experts in areas like energy healing, mindset mastery, and modern dating strategy.",
  },
  {
    title: "Private Group Chat",
    desc: "Direct access to your circle and to Dr. Patricia via private chat throughout the full 8 weeks. No one left behind.",
  },
  {
    title: "Bonus Workshop Library",
    desc: "Instant access to Dr. Patricia's vault of bonus workshops on attraction, communication, and feminine energy mastery.",
  },
];

const WHO_ITS_FOR = [
  {
    title: "The Accomplished Woman Ready to Open Her Heart",
    desc: "You've built a beautiful life — career, independence, confidence — but love still feels elusive. You're ready to do the deep work alongside women who truly get it.",
  },
  {
    title: "The Healer Breaking Toxic Patterns",
    desc: "You can see your cycles clearly, but knowing isn't the same as healing. You crave a sacred container where deep, guided transformation actually happens.",
  },
  {
    title: "The Romantic Who Refuses to Settle",
    desc: "You believe in extraordinary love — soulful, passionate, lasting. You want a community and a coach who share that vision and can help you walk toward it.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I joined the Love Circle thinking I needed dating strategy. What I got was a complete reclamation of myself. By week four, I had let go of a relationship I'd been holding onto for six years. By week eight, I was finally free — and somehow, more magnetic than ever.",
    author: "Renée M.",
    location: "Atlanta, GA",
  },
  {
    quote:
      "Dr. Patricia's group changed my life in ways I cannot fully articulate. The women in my circle became mirrors of my highest self. I am now in the most loving relationship of my life — with myself first, and now with my partner.",
    author: "Simone T.",
    location: "Chicago, IL",
  },
  {
    quote:
      "I was skeptical of a group format — I'm a private person. But this circle created the safest, most sacred space I have ever been in. Worth every penny and every tear.",
    author: "Adriana K.",
    location: "Houston, TX",
  },
];

const FAQS = [
  {
    q: "How is the group coaching different from the VIP Intensive Day?",
    a: "The Love Circle is an 8-week shared journey with a small, curated cohort of women. You gain community, accountability, and the power of collective healing — alongside direct coaching from Dr. Patricia. The VIP Day is a private 1-on-1 immersion. Both are powerful; the right choice depends on what you need most right now.",
  },
  {
    q: "How many women are in each cohort?",
    a: "Each Love Circle is intentionally kept intimate — a maximum of 12 women. This ensures Dr. Patricia can give meaningful attention to every participant and that your circle becomes a genuine sisterhood, not just a course.",
  },
  {
    q: "What if I can't attend a live call?",
    a: "All live sessions are recorded in full and delivered to your private portal within 24 hours. You will never miss content, but we do encourage live attendance whenever possible — the live energy is transformational.",
  },
  {
    q: "Is there a payment plan?",
    a: "Yes. You may pay in full ($2,500) or choose our 3-payment plan of $900/month. Both options grant full, immediate access to all community materials and the bonus workshop library.",
  },
];

export default function GroupCoachingPage() {
  return (
    <div className="min-h-screen bg-cream text-text-primary">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-midnight" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,45,107,0.7) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(212,175,106,0.2) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center animate-fade-in py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 text-accent-gold text-sm font-semibold tracking-wide mb-6">
            <Users className="w-4 h-4" />
            8-WEEK IMMERSIVE EXPERIENCE
          </div>

          <p className="script-accent text-accent-gold mb-4">Introducing</p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-cream leading-tight mb-6">
            The Love Circle
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif text-accent-gold/90 mb-8 font-light">
            Group Coaching with Dr. Patricia George
          </h2>

          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto mb-12">
            An intimate, 8-week sacred container for high-achieving women ready to break the patterns keeping them from the deep, lasting love they deserve.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#enroll" className="btn-gold">
              Join the Love Circle — $2,500
            </a>
            <a href="#whats-included" className="btn-outline">
              See What&apos;s Included
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-accent-gold" />
              Max 12 Women Per Circle
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-accent-gold" />
              All Sessions Recorded
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-accent-gold" />
              Payment Plans Available
            </span>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section id="whats-included" className="py-24 bg-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wide mb-4">
              <Star className="w-4 h-4 fill-current" />
              WHAT&apos;S INCLUDED
            </div>
            <h2 className="section-heading text-primary mb-4">
              Everything You Need to{" "}
              <span className="text-gradient-plum">Fully Transform</span>
            </h2>
            <p className="section-subheading text-gray-600 max-w-xl mx-auto">
              Six pillars of support, designed to meet you where you are and carry you somewhere extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {INCLUDED_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent-gold/20 flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-text-primary mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-midnight py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-plum opacity-30" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-cream mb-4">
              Is This For You?
            </h2>
            <p className="text-gray-400 text-lg font-light max-w-lg mx-auto">
              The Love Circle calls to a particular kind of woman — one who is brave enough to do the real work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHO_ITS_FOR.map((item, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-8 border border-white/10 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center mb-5">
                  <Heart className="w-4 h-4 text-accent-gold fill-current" />
                </div>
                <h3 className="text-xl font-serif text-accent-gold mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-cream overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <p className="script-accent text-primary mb-3">Their Words</p>
            <h2 className="section-heading text-primary">
              Love Circle{" "}
              <span className="text-gradient-gold">Transformations</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <blockquote
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent-gold fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic font-light flex-grow text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 pt-6 border-t border-gray-100">
                  <p className="font-semibold text-text-primary text-sm">{t.author}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{t.location}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Enrollment */}
      <section id="enroll" className="bg-midnight py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(107,45,107,0.5) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 max-w-2xl relative z-10">
          <div className="glass rounded-3xl p-10 border border-white/10 glow-plum text-center">
            <p className="script-accent text-accent-gold mb-3">Join Us</p>
            <h2 className="text-3xl md:text-4xl font-serif text-cream mb-3">
              The Love Circle
            </h2>
            <p className="text-gray-400 mb-8 font-light">
              8 weeks. Intimate cohort. Profound transformation.
            </p>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-5xl font-light text-cream">$2,500</span>
                <div className="text-left">
                  <p className="text-accent-gold text-sm font-semibold">Pay in Full</p>
                  <p className="text-gray-500 text-xs">Best value</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                — or —{" "}
                <span className="text-accent-gold font-medium">
                  3 payments of $900
                </span>
              </p>
            </div>

            {/* What's included summary */}
            <ul className="text-left space-y-3 mb-10">
              {[
                "8 × 90-min live group coaching calls with Dr. Patricia",
                "Private community & daily chat access",
                "Weekly accountability homework & audits",
                "2 guest expert bonus sessions",
                "Full session recordings",
                "Lifetime access to the bonus workshop vault",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <GroupCoachingCheckout />

            <p className="text-center text-gray-500 text-xs mt-4 flex items-center justify-center gap-1.5">
              <Shield className="w-3 h-3" />
              Secure Stripe Checkout — your information is protected
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="section-heading text-primary mb-4">
              Your Questions, Answered
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-text-primary font-serif text-lg hover:text-primary transition-colors duration-200">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200 shrink-0 ml-3" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed font-light">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-midnight py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-plum opacity-40" />
        <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
          <p className="script-accent text-accent-gold mb-4">The circle is waiting</p>
          <h2 className="text-3xl md:text-5xl font-serif text-cream mb-6">
            Your Transformation Begins With One Step
          </h2>
          <p className="text-gray-300 mb-10 font-light text-lg max-w-xl mx-auto">
            Seats are limited to 12 women per cohort. If you feel the call, honor it — this is the moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#enroll" className="btn-gold">
              Secure My Seat Now
            </a>
            <Link href="/apply" className="btn-outline">
              Apply for VIP Instead
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
