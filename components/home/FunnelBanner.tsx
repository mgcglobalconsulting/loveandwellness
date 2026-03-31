"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  { step: "01", label: "Free Training", sub: "Daily, 40–90 min", href: "/webinar" },
  { step: "02", label: "Masterclass Party", sub: "Fridays 7–10 PM", href: "/masterclass" },
  { step: "03", label: "Apply", sub: "Qualify for coaching", href: "/apply" },
  { step: "04", label: "Transform", sub: "VIP or Group Program", href: "/vip" },
];

export function FunnelBanner() {
  return (
    <section className="py-12 bg-midnight border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {steps.map((item, i) => (
            <div key={item.step} className="flex items-center">
              <Link
                href={item.href}
                className="flex flex-col items-center px-6 py-4 rounded-2xl hover:bg-white/5 transition-colors duration-200 group min-w-[120px]"
              >
                <span className="text-accent-gold/50 text-xs font-accent tracking-widest mb-1">
                  STEP {item.step}
                </span>
                <span className="text-white font-display text-lg font-semibold group-hover:text-accent-gold transition-colors">
                  {item.label}
                </span>
                <span className="text-white/40 text-xs mt-0.5">{item.sub}</span>
              </Link>
              {i < steps.length - 1 && (
                <ArrowRight size={16} className="text-accent-gold/30 mx-2 hidden md:block" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
