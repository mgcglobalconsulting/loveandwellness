"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/patricia/0003_patricia_lindon_jax_photography_ md 7 21 2022_.jpg",
  "/images/patricia/0155-03 05 2023 lindon patricia wedding -jax-photography.jpg",
  "/images/patricia/0243-lindonpatrica-jax-photography.jpg",
];

const secrets = [
  "Secret 1: The Foundation",
  "Secret 2: The Pattern",
  "Secret 3: The Transformation"
];

export function ImageSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500); // 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-accent-gold/20 shadow-2xl shadow-accent-gold/5 group mb-12">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt="Lasting Love Transformation"
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 py-10 to-transparent flex items-end justify-center sm:justify-start pb-6 sm:pb-8 sm:px-8">
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white font-serif text-xl sm:text-2xl font-light tracking-wide"
            >
              {secrets[index]}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "bg-accent-gold w-6" : "bg-white/40 w-2 hover:bg-white/60"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
