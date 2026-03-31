import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Heart } from "lucide-react";

const footerLinks = {
  coaching: [
    { href: "/about", label: "About Dr. Patricia" },
    { href: "/services", label: "Services" },
    { href: "/apply", label: "Apply for Coaching" },
    { href: "/testimonials", label: "Testimonials" },
  ],
  programs: [
    { href: "/webinar", label: "Free Daily Training" },
    { href: "/masterclass", label: "Friday Masterclass" },
    { href: "/vip", label: "VIP Day" },
    { href: "/group-coaching", label: "Group Coaching" },
  ],
  resources: [
    { href: "/blog", label: "Blog" },
    { href: "/shop", label: "Wellness Shop" },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-midnight text-white">
      {/* Newsletter Banner */}
      <div
        className="py-16 px-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(107,45,107,0.4) 0%, rgba(44,95,106,0.3) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="script-accent text-accent-gold mb-2">Stay Connected</p>
          <h3 className="section-heading text-white mb-4">
            Weekly Love Letters from Dr. Patricia
          </h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Insights on love, relationships, and personal growth — delivered
            with warmth every week.
          </p>
          <form
            action="/api/leads"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent-gold transition-colors"
            />
            <button type="submit" className="btn-gold whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-accent-gold/40">
                <Image
                  src="/images/logos/love-wellness-butterfly.jpeg"
                  alt="Love & Wellness Coaching"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-serif text-xl leading-tight">
                  Love & Wellness
                </p>
                <p className="text-accent-gold text-xs font-accent tracking-widest uppercase">
                  Coaching
                </p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Dr. Patricia George guides you toward the love, wholeness, and
              relationship you were born to experience.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent-gold/20 flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent-gold/20 flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent-gold/20 flex items-center justify-center transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-accent-gold font-accent text-xs tracking-widest uppercase mb-5">
              Coaching
            </h4>
            <ul className="space-y-3">
              {footerLinks.coaching.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-accent-gold font-accent text-xs tracking-widest uppercase mb-5">
              Programs
            </h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-accent-gold font-accent text-xs tracking-widest uppercase mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Love & Wellness Coaching. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/40 hover:text-white/70 text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
