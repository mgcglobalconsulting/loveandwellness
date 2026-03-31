import type { Metadata } from "next";
import Image from "next/image";
import { WebinarRegisterForm } from "@/components/webinar/WebinarRegisterForm";
import { ImageSlideshow } from "@/components/webinar/ImageSlideshow";
import { Check, Clock, Users, Star } from "lucide-react";
import * as motion from "framer-motion/client";

export const metadata: Metadata = {
  title: "Free Training — The 3 Secrets to Attracting Lasting Love",
  description:
    "Join Dr. Patricia George for a free 40–90 minute training revealing the secrets to attracting and keeping lasting love. Sessions run daily.",
};

const reveals = [
  "The 3 secrets to attracting lasting, intentional love — and why most people never discover them",
  "Why you keep repeating the same relationship patterns, and the precise moment that changes",
  "Dr. Patricia's personal transformation story and the framework she's used with 200+ clients",
  "The ONE thing holding you back from the love life you want (it's not what you think)",
];

export default function WebinarPage() {
  return (
    <div className="min-h-screen bg-cream pt-24">
      {/* Hero + Form */}
      <section
        className="py-16 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0D0A14 0%, #1A0A2A 60%, #0A1A20 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-accent-gold/20 text-accent-gold px-4 py-2 rounded-full text-xs font-accent font-semibold tracking-wide uppercase mb-6">
                <Clock size={10} />
                Free Daily Training · 40–90 Minutes
              </div>
              <h1
                className="font-serif text-white mb-6 leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                The 3 Secrets to Attracting{" "}
                <span className="text-gradient-gold">Lasting Love</span>
              </h1>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                A free, live training experience with Dr. Patricia George —
                delivered with depth, honesty, and the transformative energy
                that has changed hundreds of lives.
              </p>

              <p className="text-accent-gold text-sm font-accent font-semibold uppercase tracking-wider mb-4">
                In this training, you'll discover:
              </p>
              <ul className="space-y-4 mb-10 mt-2">
                {reveals.map((item, idx) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/40 border border-primary flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-accent-gold" strokeWidth={3} />
                    </div>
                    <span className="text-white/75 text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Sleek Slideshow Gallery */}
              <ImageSlideshow />

              {/* Dr. Patricia bio snippet */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-accent-gold/40 flex-shrink-0">
                  <Image
                    src="/images/patricia/0002_patricia_lindon_jax_photography_ md 7 21 2022_.jpg"
                    alt="Dr. Patricia George"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-white font-accent font-semibold text-sm">
                    Dr. Patricia George
                  </p>
                  <p className="text-white/50 text-xs">
                    Love & Wellness Coach · 15+ Years Experience
                  </p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className="text-accent-gold fill-current"
                      />
                    ))}
                    <span className="text-white/50 text-xs ml-1">4.9 · 200+ clients</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Registration Form */}
            <div>
              <WebinarRegisterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Note: NO free gifts mentioned anywhere on this page */}
      {/* Value is in the training itself */}

      {/* Social proof strip */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { icon: Users, stat: "200+", label: "Training Graduates" },
              { icon: Clock, stat: "Daily", label: "Sessions Available" },
              { icon: Star, stat: "4.9★", label: "Average Rating" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <item.icon size={20} className="text-primary mb-2" />
                <p className="text-2xl font-serif text-text-primary font-semibold">
                  {item.stat}
                </p>
                <p className="text-xs text-gray-400 font-accent uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
