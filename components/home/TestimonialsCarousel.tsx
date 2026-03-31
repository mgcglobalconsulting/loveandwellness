"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Tanya M.",
    location: "Atlanta, GA",
    photo: "/images/patricia/0021patricia-2021.jpg",
    usePatriciaPhoto: false,
    stars: 5,
    text: "Before joining this coaching program, I felt like I was at a crossroads in my life, uncertain about love and what I truly deserved. Dr. Patricia didn't just give me tools — she helped me see myself differently. Six months later, I'm in the most loving relationship I've ever had.",
    result: "Found a committed relationship in 6 months",
  },
  {
    name: "Marcus & Diana R.",
    location: "Houston, TX",
    photo: null,
    usePatriciaPhoto: false,
    stars: 5,
    text: "We were on the verge of separation after 8 years. Dr. Patricia's coaching gave us a language for our pain and a roadmap for healing. We didn't just save our marriage — we built one we actually love being in.",
    result: "Saved their marriage, built a deeper bond",
  },
  {
    name: "Renee W.",
    location: "Chicago, IL",
    photo: null,
    usePatriciaPhoto: false,
    stars: 5,
    text: "I came in thinking I needed to fix my relationships. What I found was that I needed to fix my relationship with myself first. Dr. Patricia has a gift for getting to the root of things with so much grace and love. I'm a completely different woman.",
    result: "Rebuilt self-worth and set healthy boundaries",
  },
  {
    name: "Lisa K.",
    location: "New York, NY",
    photo: null,
    usePatriciaPhoto: false,
    stars: 5,
    text: "The VIP Day with Dr. Patricia was unlike anything I've ever experienced. In one focused day, I gained more clarity than years of therapy gave me. If you're serious about love, you need Dr. Patricia in your corner.",
    result: "Total clarity after VIP Day intensive",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-accent-gold fill-current" />
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FAF6F1 0%, #F5E8F0 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="script-accent text-primary mb-3">Real Transformations</p>
          <h2 className="section-heading text-text-primary">
            Lives Changed by{" "}
            <span className="text-gradient-plum">Love & Wellness</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-glass"
            >
              <Quote size={36} className="text-primary/20 mb-6" />
              <p className="text-gray-700 text-lg md:text-xl font-display italic leading-relaxed mb-8">
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-serif text-xl font-semibold">
                      {testimonials[current].name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-accent font-semibold text-text-primary text-sm">
                      {testimonials[current].name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {testimonials[current].location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <StarRating count={testimonials[current].stars} />
                  <p className="text-xs text-primary font-accent mt-1">
                    {testimonials[current].result}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-primary hover:shadow-glow-rose transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-gray-200 hover:bg-primary/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-primary hover:shadow-glow-rose transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="/testimonials" className="text-primary font-accent text-sm font-semibold hover:underline">
            Read all testimonials →
          </a>
        </div>
      </div>
    </section>
  );
}
