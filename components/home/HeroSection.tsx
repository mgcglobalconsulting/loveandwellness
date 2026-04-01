"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Cross } from "lucide-react";
import { CountdownTimer } from "@/components/webinar/CountdownTimer";
import { getNextWebinarTime } from "@/lib/utils";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nextSession] = useState(() => getNextWebinarTime());

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
      x: number; y: number; radius: number;
      speedX: number; speedY: number;
      opacity: number; opacitySpeed: number; color: string;
    }

    const colors = [
      "rgba(212, 175, 106,",
      "rgba(232, 160, 160,",
      "rgba(155, 79, 155,",
      "rgba(255, 240, 220,",
    ];

    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1440),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 900),
      radius: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3 - 0.15,
      opacity: Math.random() * 0.5 + 0.1,
      opacitySpeed: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacitySpeed;
        if (p.opacity >= 0.65 || p.opacity <= 0.04) p.opacitySpeed *= -1;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        g.addColorStop(0, `${p.color}${p.opacity})`);
        g.addColorStop(1, `${p.color}0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(p.opacity * 1.8, 0.9)})`;
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
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── LAYER 1: deep midnight base ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #08040F 0%, #140821 35%, #0C1520 65%, #08040F 100%)",
        }}
      />

      {/* ── LAYER 2: radial depth glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left plum bloom */}
        <div
          className="absolute"
          style={{
            left: "-10%", top: "10%",
            width: "55%", height: "80%",
            background: "radial-gradient(ellipse at center, rgba(107,45,107,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Right gold warmth */}
        <div
          className="absolute"
          style={{
            right: "-5%", top: "0%",
            width: "60%", height: "100%",
            background: "radial-gradient(ellipse at 80% 40%, rgba(212,175,106,0.10) 0%, transparent 65%)",
          }}
        />
        {/* Center deep bloom */}
        <div
          className="absolute inset-x-0"
          style={{
            top: "30%", height: "50%",
            background: "radial-gradient(ellipse at 50% 50%, rgba(155,79,155,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── LAYER 3: particle canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.65 }}
      />

      {/* ── LAYER 4: bottom fade ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #08040F 0%, transparent 100%)",
        }}
      />

      {/* ── DECORATIVE: thin horizontal rule ── */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "50%", height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(212,175,106,0.12) 30%, rgba(212,175,106,0.06) 70%, transparent 100%)" }}
      />

      {/* ── MAIN CONTENT: split layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Text content ── */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            {/* Faith badge */}
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-accent tracking-widest uppercase"
                style={{
                  background: "rgba(212,175,106,0.1)",
                  border: "1px solid rgba(212,175,106,0.3)",
                  color: "#D4AF6A",
                }}
              >
                <Sparkles size={10} />
                Faith · Love · Wholeness
                <Sparkles size={10} />
              </div>
            </motion.div>

            {/* Script accent */}
            <motion.p
              className="script-accent mb-3"
              style={{ color: "#D4AF6A", fontSize: "clamp(1.8rem,4vw,2.8rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Welcome to a new chapter
            </motion.p>

            {/* Main headline */}
            <motion.h1
              className="section-heading text-white mb-6 leading-none"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
            >
              The Universal Language{" "}
              <span className="text-gradient-gold block mt-1">is LOVE</span>
            </motion.h1>

            {/* Tagline — Dr. Patricia's mission statement */}
            <motion.p
              className="text-white/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.125rem)", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I help high-performing Christian singles and couples win in the
              boardroom and build emotionally, spiritually, and relationally
              aligned love — honoring God in every stage, from preparation to
              marriage, including the intimacy of the marital relationship.
            </motion.p>

            {/* Attribution line */}
            <motion.p
              className="text-white/40 text-sm font-accent mb-8 lg:mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.75 }}
            >
              — Dr. Patricia George
            </motion.p>

            {/* Countdown */}
            <motion.div
              className="mb-10 flex flex-col items-center lg:items-start gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              <div
                className="flex items-center gap-2 text-xs font-accent tracking-widest uppercase"
                style={{ color: "rgba(212,175,106,0.75)" }}
              >
                <Sparkles size={10} />
                Next Free Training Session
                <Sparkles size={10} />
              </div>
              <CountdownTimer targetDate={nextSession} variant="hero" />
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Link href="/webinar" className="btn-gold text-base px-9 py-4">
                Join the Free Training
              </Link>
              <Link href="/apply" className="btn-outline text-base px-9 py-4">
                Apply for Coaching
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.15 }}
            >
              {[
                { stat: "25+", label: "Years Experience" },
                { stat: "500+", label: "Lives Transformed" },
                { stat: "4.9★", label: "Client Rating" },
              ].map(({ stat, label }) => (
                <div key={label} className="text-center">
                  <div
                    className="font-serif text-xl font-semibold"
                    style={{ color: "#D4AF6A" }}
                  >
                    {stat}
                  </div>
                  <div className="text-white/35 text-xs font-accent tracking-wide uppercase mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Dr. Patricia's photo ── */}
          <motion.div
            className="order-1 lg:order-2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-sm lg:max-w-md">

              {/* Outer decorative ring */}
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,106,0.15) 0%, transparent 50%, rgba(107,45,107,0.15) 100%)",
                  border: "1px solid rgba(212,175,106,0.12)",
                }}
              />

              {/* Glow behind photo */}
              <div
                className="absolute -inset-2 rounded-2xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 50%, rgba(107,45,107,0.35) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Photo frame */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,106,0.18)",
                  aspectRatio: "4/5",
                }}
              >
                <Image
                  src="/images/patricia/patricia-glamore.jpg"
                  alt="Dr. Patricia George — Love & Wellness Coach"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 80vw, 45vw"
                />
                {/* Photo overlay for depth */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(13,10,20,0.45) 0%, transparent 50%)",
                  }}
                />
              </div>

              {/* Floating credential card */}
              <motion.div
                className="absolute -bottom-6 -left-6 lg:-left-10 z-20 rounded-2xl px-5 py-4"
                style={{
                  background: "rgba(20,8,33,0.92)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(212,175,106,0.25)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <p className="text-white font-serif text-base font-semibold leading-tight">
                  Dr. Patricia George
                </p>
                <p className="text-xs font-accent tracking-wide mt-1" style={{ color: "#D4AF6A" }}>
                  Transformational Strategist
                </p>
                <p className="text-white/40 text-xs mt-0.5">Love · Relationships · Healing</p>
              </motion.div>

              {/* Floating faith accent */}
              <motion.div
                className="absolute -top-4 -right-4 lg:-right-8 z-20 w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(212,175,106,0.12)",
                  border: "1px solid rgba(212,175,106,0.3)",
                  backdropFilter: "blur(8px)",
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span style={{ fontSize: "1.75rem" }}>✝</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: "rgba(255,255,255,0.3)" }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-accent tracking-widest uppercase">Explore</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
