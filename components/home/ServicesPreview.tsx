"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Users, Sparkles, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Find Your Person",
    description:
      "For singles who are ready to attract the love they deserve. Stop settling, stop waiting — start becoming magnetic to the right relationship.",
    href: "/services#find-love",
    color: "from-primary/20 to-accent-rose/20",
    iconColor: "text-accent-rose",
    borderColor: "border-accent-rose/30",
  },
  {
    icon: Users,
    title: "Strengthen Your Bond",
    description:
      "For couples ready to move beyond surface-level connection into a deeper, more intimate, and unbreakable partnership.",
    href: "/services#strengthen",
    color: "from-primary/20 to-teal-deep/20",
    iconColor: "text-teal-light",
    borderColor: "border-teal-light/30",
  },
  {
    icon: Sparkles,
    title: "Love Yourself First",
    description:
      "True love starts within. Cultivate the self-worth, boundaries, and inner peace that make all other love possible.",
    href: "/services#self-love",
    color: "from-accent-gold/20 to-primary/20",
    iconColor: "text-accent-gold",
    borderColor: "border-accent-gold/30",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(107,45,107,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(44,95,106,0.4) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="script-accent text-accent-gold mb-3">How I Can Help</p>
          <h2 className="section-heading text-white mb-5">
            Coaching Built for Your{" "}
            <span className="text-gradient-gold">Unique Journey</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg font-light">
            Whether you're single, partnered, or still learning to love
            yourself — there's a path forward, and Dr. Patricia will walk it
            with you.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <Link
                href={service.href}
                className={`block h-full glass rounded-3xl p-8 border ${service.borderColor} hover:border-opacity-60 transition-all duration-300 group hover:-translate-y-1`}
                style={{
                  background: `linear-gradient(135deg, ${service.color.replace("from-", "").replace("to-", "")})`,
                }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/10 ${service.iconColor}`}
                >
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-display text-white mb-3 font-semibold">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div
                  className={`flex items-center gap-2 text-sm font-accent font-semibold ${service.iconColor} group-hover:gap-3 transition-all duration-200`}
                >
                  Learn More <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link href="/services" className="btn-outline">
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
