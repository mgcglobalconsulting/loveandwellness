"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function AboutSnippet() {
  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="photo-frame max-w-md mx-auto lg:mx-0">
              <Image
                src="/images/patricia/0155-03 05 2023 lindon patricia wedding -jax-photography.jpg"
                alt="Dr. Patricia George"
                width={500}
                height={600}
                className="w-full object-cover rounded-2xl"
                style={{ aspectRatio: "5/6" }}
              />
            </div>
            {/* Floating accent card */}
            <div
              className="absolute z-20 -bottom-6 -right-6 lg:right-auto lg:-left-6 glass-light rounded-2xl p-6 shadow-glass max-w-sm"
              style={{ background: "rgba(250,246,241,0.95)" }}
            >
              <Quote size={20} className="text-primary mb-2" />
              <p className="text-text-primary text-sm font-display italic leading-relaxed">
                "Embracing love and wellness transformed my journey — from
                loneliness to a harmonious partnership I now cherish."
              </p>
              <p className="text-primary text-xs font-accent mt-3 font-semibold">
                — Dr. Patricia George
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <p className="script-accent text-primary mb-3">About Dr. Patricia</p>
            <h2 className="section-heading text-text-primary mb-6">
              From Loneliness to{" "}
              <span className="text-gradient-plum">Lasting Love</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Dr. Patricia George knows what it feels like to want love and not
              know how to find it — or how to keep it. Her journey from
              uncertainty to a thriving, intentional relationship is the
              foundation of everything she teaches.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              With over 15 years of experience in holistic love and wellness
              coaching, Dr. Patricia has guided hundreds of individuals and
              couples toward relationships that are not just functional, but
              deeply fulfilling, emotionally intimate, and built to last.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              She doesn't believe in temporary fixes. She believes in
              transformation — the kind that changes how you see yourself, how
              you show up, and who you attract.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { stat: "200+", label: "Lives Transformed" },
                { stat: "15+", label: "Years Experience" },
                { stat: "4.9★", label: "Client Rating" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-3xl font-serif text-primary font-semibold">
                    {item.stat}
                  </p>
                  <p className="text-xs text-gray-500 font-accent tracking-wide uppercase">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn-primary">
              Read Dr. Patricia's Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
