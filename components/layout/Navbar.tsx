"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/webinar", label: "Free Training" },
  { href: "/masterclass", label: "Masterclass" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-midnight/95 backdrop-blur-md shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div 
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-accent-gold/50 group-hover:border-accent-gold transition-colors duration-300 shadow-md shadow-accent-gold/10"
            >
              <Image
                src="/images/logos/love-wellness-butterfly.jpeg"
                alt="Love & Wellness Coaching"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-serif text-lg leading-tight">
                Love & Wellness
              </p>
              <p className="text-accent-gold text-xs font-accent tracking-widest uppercase">
                Coaching
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-accent-gold text-sm font-accent font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/donate"
              className="flex items-center gap-1.5 text-accent-rose hover:text-white text-sm font-accent transition-colors duration-200"
            >
              <Heart size={14} className="fill-current" />
              Donate
            </Link>
            <Link href="/apply" className="btn-gold text-sm px-6 py-2.5">
              Apply for Coaching
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-white/80 hover:text-accent-gold px-4 py-3 rounded-lg hover:bg-white/5 font-accent text-sm tracking-wide transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 px-4">
                <Link
                  href="/donate"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2 text-accent-rose text-sm font-accent"
                >
                  <Heart size={14} className="fill-current" />
                  Donate
                </Link>
                <Link
                  href="/apply"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-gold text-sm text-center"
                >
                  Apply for Coaching
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
