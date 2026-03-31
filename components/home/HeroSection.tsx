"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { CountdownTimer } from "@/components/webinar/CountdownTimer";
import { getNextWebinarTime } from "@/lib/utils";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nextSession] = useState(() => getNextWebinarTime());

  // Romantic particle animation — floating light orbs
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacitySpeed: number;
      color: string;
    }

    const colors = [
      "rgba(212, 175, 106,",   // gold
      "rgba(232, 160, 160,",   // rose
      "rgba(155, 79, 155,",    // plum light
      "rgba(255, 255, 255,",   // white
    ];

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4 - 0.2,
      opacity: Math.random() * 0.6 + 0.1,
      opacitySpeed: (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacitySpeed;

        if (p.opacity >= 0.7 || p.opacity <= 0.05) p.opacitySpeed *= -1;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Draw glow orb
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        gradient.addColorStop(0, `${p.color}${p.opacity})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(p.opacity * 1.5, 0.9)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background: deep midnight gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0D0A14 0%, #1A0A2A 40%, #0A1A20 70%, #0D0A14 100%)",
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Background photo overlay — Patricia's most beautiful shot */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/patricia/0043patricia-2021.jpg')",
          opacity: 0.15,
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,10,20,0.3) 0%, rgba(13,10,20,0.1) 40%, rgba(13,10,20,0.6) 80%, rgba(13,10,20,0.95) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28 pb-16">
        {/* Script accent */}
        <motion.p
          className="script-accent text-accent-gold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to a new chapter
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="section-heading text-white mb-6"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          The Universal Language{" "}
          <span className="text-gradient-gold">is LOVE</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-white/75 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Dr. Patricia George guides you toward the love, wholeness, and
          relationship you were born to experience — with your partner, your
          family, and yourself.
        </motion.p>

        {/* Next session countdown */}
        <motion.div
          className="mb-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center gap-2 text-accent-gold/80 text-xs font-accent tracking-widest uppercase">
            <Sparkles size={12} />
            Next Free Training Session
            <Sparkles size={12} />
          </div>
          <CountdownTimer targetDate={nextSession} variant="hero" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Link href="/webinar" className="btn-gold text-base px-10 py-4">
            Join the Free Training
          </Link>
          <Link href="/apply" className="btn-outline text-base px-10 py-4">
            Apply for Coaching
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          className="mt-8 text-white/40 text-sm font-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          200+ lives transformed · 15+ years experience · 4.9★ rated coaching
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-accent tracking-widest uppercase">
          Explore
        </span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
