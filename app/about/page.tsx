import Image from "next/image";
import Link from "next/link";
import { Heart, BookOpen, Users, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Patricia George",
  description:
    "Meet Dr. Patricia George — transformational strategist in love, human relationships, and emotional healing with 25+ years of experience guiding individuals, couples, and leaders.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-text-primary">

      {/* ── HERO BANNER ── */}
      <section
        className="relative pt-40 pb-28 overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #08040F 0%, #1A0828 50%, #0C1520 100%)",
        }}
      >
        {/* Radial bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(107,45,107,0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center animate-fade-in">
          <p
            className="script-accent mb-4"
            style={{ color: "#D4AF6A", fontSize: "clamp(1.8rem,4vw,2.6rem)" }}
          >
            Meet Dr. Patricia
          </p>
          <h1
            className="section-heading text-white mb-6"
            style={{ fontSize: "clamp(2.4rem,5.5vw,4.2rem)" }}
          >
            25 Years of Transforming{" "}
            <span className="text-gradient-gold">Love & Lives</span>
          </h1>
          <p
            className="text-white/65 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontStyle: "italic" }}
          >
            I help high-performing Christian singles and couples win in the
            boardroom and build emotionally, spiritually, and relationally
            aligned love — honoring God in every stage, from preparation to
            marriage, including the intimacy of the marital relationship.
          </p>
        </div>
      </section>

      {/* ── MAIN STORY ── */}
      <section className="container mx-auto px-4 max-w-6xl py-24">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-start animate-slide-up">

          {/* Photo stack */}
          <div className="relative">
            <div className="photo-frame aspect-[4/5] w-full max-w-md mx-auto relative">
              <Image
                src="/images/patricia/patricia-glamore.jpg"
                alt="Dr. Patricia George"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            {/* Secondary photo peek */}
            <div
              className="absolute -bottom-6 -right-6 w-40 h-48 rounded-2xl overflow-hidden hidden lg:block"
              style={{
                boxShadow: "0 12px 40px rgba(107,45,107,0.3)",
                border: "3px solid white",
              }}
            >
              <Image
                src="/images/patricia/patricia-portrait.jpg"
                alt="Dr. Patricia George"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Bio text */}
          <div className="space-y-6 pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wide">
              <Heart className="w-4 h-4 fill-current" />
              Transformational Strategist · Author · Speaker
            </div>

            <h2 className="text-3xl md:text-4xl font-serif text-text-primary leading-snug">
              &ldquo;The mystery is in the history.&rdquo;
            </h2>

            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Dr. Patricia George is a transformational strategist in love,
                human relationships, and emotional healing, with more than{" "}
                <strong className="text-text-primary font-semibold">
                  25 years of experience
                </strong>{" "}
                guiding individuals, couples, and leaders through profound
                personal and relational transformation.
              </p>

              <p>
                Over the past 25–30 years, she has worked with families,
                high-performing individuals, and leaders across all levels —
                including heads of ministries, pastors, prophets, teachers,
                evangelists, apostles, and bishops — helping them cultivate
                emotionally safe, authentic, and deeply connected relationships
                with the people who matter most.
              </p>

              <p>
                Her work extends beyond surface-level insight. She addresses
                the psychological, emotional, relational, and spiritual dynamics
                that shape how people love, connect, and sustain meaningful
                relationships — personally, romantically, and within leadership.
              </p>

              <p>
                Dr. George is widely known for her ability to help
                high-functioning individuals who are successful in the boardroom
                but seeking the same level of clarity, connection, and
                fulfillment in their personal lives — including their romantic,
                marital, and intimate relationships.
              </p>

              <p>
                Her methodology is rooted in a powerful, integrative approach —
                combining{" "}
                <strong className="text-text-primary font-semibold">
                  biblical principles, emotional intelligence, and strategic
                  insight
                </strong>
                . She is known for her foundational belief that{" "}
                <em>&ldquo;the mystery is in the history,&rdquo;</em> and that
                lasting transformation requires identifying and resolving the
                root causes of repeated relational patterns.
              </p>

              <p>
                Her life is a living testament to the transformation she
                teaches. Having overcome deep personal adversity, she has
                rebuilt her life through healing, forgiveness, and faith —
                creating not only a thriving marriage and family dynamic, but
                also generational impact.
              </p>

              <p>
                Today, Dr. Patricia George works with a select number of clients
                who are ready for real clarity, deep healing, and lasting change
                — guiding them into emotionally safe, aligned, and
                purpose-driven relationships in every area of life.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="script-accent text-primary mb-2">With Love,</p>
              <p className="font-serif text-2xl text-text-primary">Dr. Patricia George</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTEGRATIVE APPROACH BANNER ── */}
      <section
        className="py-16 border-y border-gray-100"
        style={{ background: "rgba(107,45,107,0.03)" }}
      >
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm font-accent text-gray-400 tracking-widest uppercase mb-4">
            Her Integrative Approach
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Biblical Principles",
              "Emotional Intelligence",
              "Strategic Insight",
              "Psychological Depth",
              "Spiritual Alignment",
              "Relational Healing",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: "rgba(107,45,107,0.08)",
                  border: "1px solid rgba(107,45,107,0.15)",
                  color: "#6B2D6B",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #08040F 0%, #140821 50%, #0C1520 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(107,45,107,0.2) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 max-w-5xl text-center">
          <p
            className="script-accent mb-3"
            style={{ color: "#D4AF6A", fontSize: "clamp(1.6rem,3vw,2.2rem)" }}
          >
            Her methodology
          </p>
          <h2
            className="text-white font-serif mb-16"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Four Pillars of Transformation
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Biblical Foundation",
                desc: "Every principle is rooted in God's design for love, marriage, and intimacy — honoring His purpose in every stage.",
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Emotional Healing",
                desc: "Identifying and resolving the root causes of repeated relational patterns — because the mystery is always in the history.",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Spiritual Alignment",
                desc: "Cultivating deep spiritual wholeness so that love flows from a place of fullness, not lack or fear.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Strategic Clarity",
                desc: "Practical, proven frameworks for high-performers who want the same excellence in their relationships they bring to their work.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="glass p-7 rounded-2xl border border-white/10 hover:-translate-y-2 transition-transform duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(212,175,106,0.12)", color: "#D4AF6A" }}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-serif text-white mb-2">{pillar.title}</h3>
                <p className="text-gray-300 font-light text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/webinar" className="btn-gold">
              Join the Free Training
            </Link>
            <Link href="/apply" className="btn-outline">
              Apply for Coaching
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHO SHE SERVES ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="script-accent text-primary mb-2" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
              Who she serves
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-text-primary">
              Dr. Patricia works with a select number of clients
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "💼",
                title: "High-Performing Singles",
                desc: "Successful professionals who excel in every area of life — except love. Ready for real clarity and aligned partnership.",
              },
              {
                emoji: "💑",
                title: "Married Couples",
                desc: "Couples ready to go deeper — emotionally, spiritually, and intimately — and build a lasting, God-honoring marriage.",
              },
              {
                emoji: "⛪",
                title: "Ministry & Church Leaders",
                desc: "Pastors, evangelists, apostles, and bishops navigating the unique relational demands of leadership and faith.",
              },
              {
                emoji: "👨‍👩‍👧‍👦",
                title: "Families",
                desc: "Families seeking to heal relational wounds and build an emotionally safe, connected home environment.",
              },
              {
                emoji: "🌱",
                title: "Those Preparing for Marriage",
                desc: "Singles who want to enter marriage whole, healed, and prepared — spiritually and emotionally.",
              },
              {
                emoji: "✝️",
                title: "Faith-Driven Leaders",
                desc: "Leaders who want their private lives to reflect the same excellence and integrity they demonstrate publicly.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:-translate-y-1 transition-all duration-300"
                style={{ background: "#FAF6F1" }}
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-serif text-lg text-text-primary mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/apply" className="btn-primary">
              Apply to Work with Dr. Patricia
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
