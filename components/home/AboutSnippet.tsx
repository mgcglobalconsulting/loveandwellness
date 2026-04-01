"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function AboutSnippet() {
  return (
    <section className="py-28 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── PHOTO ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="photo-frame max-w-md mx-auto lg:mx-0">
              <Image
                src="/images/patricia/patricia-portrait.jpg"
                alt="Dr. Patricia George — Love & Wellness Coach"
                width={500}
                height={600}
                className="w-full object-cover rounded-2xl"
                style={{ aspectRatio: "5/6" }}
              />
            </div>

            {/* Floating quote card */}
            <motion.div
              className="absolute z-20 -bottom-8 -right-4 lg:right-auto lg:-left-8 rounded-2xl p-5 shadow-glass max-w-xs"
              style={{ background: "rgba(250,246,241,0.97)", border: "1px solid rgba(107,45,107,0.12)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Quote size={18} className="text-primary mb-2 opacity-60" />
              <p className="text-text-primary text-sm font-display italic leading-relaxed">
                "The mystery is in the history — lasting transformation requires
                finding and healing the root."
              </p>
              <p className="text-primary text-xs font-accent mt-3 font-semibold">
                — Dr. Patricia George
              </p>
            </motion.div>
          </motion.div>

          {/* ── TEXT ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <p className="script-accent text-primary mb-3">About Dr. Patricia</p>
            <h2 className="section-heading text-text-primary mb-6">
              Transforming Hearts,{" "}
              <span className="text-gradient-plum">Honoring God</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-5 text-lg font-display italic">
              Dr. Patricia George is a transformational strategist in love,
              human relationships, and emotional healing — with more than 25
              years of experience guiding individuals, couples, and leaders
              through profound personal and relational transformation.
            </p>

            <p className="text-gray-600 leading-relaxed mb-5">
              She is widely known for her ability to help high-functioning
              individuals who are successful in the boardroom yet seeking the
              same level of clarity, connection, and fulfillment in their
              personal lives — including their romantic, marital, and intimate
              relationships.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Her methodology combines biblical principles, emotional
              intelligence, and strategic insight. Her life is a living
              testament to the transformation she teaches — having overcome deep
              personal adversity to build a thriving marriage, family, and
              generational legacy.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              {[
                { stat: "25+", label: "Years Experience" },
                { stat: "500+", label: "Lives Transformed" },
                { stat: "4.9★", label: "Client Rating" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-3xl font-serif text-primary font-semibold">
                    {item.stat}
                  </p>
                  <p className="text-xs text-gray-500 font-accent tracking-wide uppercase mt-0.5">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary">
              Read Dr. Patricia&apos;s Full Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
