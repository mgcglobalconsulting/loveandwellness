import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-text-primary pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h1 className="section-heading mb-6 text-primary">
            Meet Dr. Patricia George
          </h1>
          <p className="section-subheading text-gray-600">
            A pioneer in love and wellness coaching, dedicated to helping you break through barriers and magnetize the lasting love you deserve.
          </p>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center animate-slide-up">
          
          <div className="photo-frame aspect-[4/5] w-full relative">
            <Image
              src="/images/logos/love-wellness-butterfly.jpeg"
              alt="Dr. Patricia George"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-light/30 bg-teal-light/10 text-teal-deep text-sm font-semibold tracking-wide mb-2">
              <Heart className="w-4 h-4 fill-current" />
              OUR MISSION
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif text-text-primary leading-snug">
              "The universal language is LOVE, and it begins from within."
            </h2>
            
            <div className="prose prose-lg text-gray-600 prose-p:leading-relaxed">
              <p>
                For over 15 years, I have guided high-achieving women out of toxic relationship loops and into the deep, fulfilling connections they've always envisioned. Yet, the true revolution never begins with finding the right partner—it begins with becoming the most vibrant, grounded version of yourself.
              </p>
              <p>
                My methodology fuses deep psychological insight, energetic wellness, and practical strategy. We don't just talk about dating; we heal the foundational blueprints that dictate who you attract and what you believe you are worthy of receiving.
              </p>
              <p>
                Whether sitting with me during a VIP Intensive or joining the Masterclass community, you are stepping into a sanctuary designed for profound transformation.
              </p>
            </div>
            
            <div className="pt-6 border-t border-gray-200 mt-8">
              <p className="script-accent text-primary mb-6">With Love,</p>
              <p className="font-serif text-2xl">Dr. Patricia</p>
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-midnight text-cream py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-plum opacity-50" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-12">The Three Pillars of Transformation</h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Radical Self-Love", desc: "Healing your core emotional wounds so you no longer seek validation externally." },
              { title: "Energetic Magnetism", desc: "Reprogramming your energetic output to naturally draw in high-quality connections." },
              { title: "Intentional Strategy", desc: "Applying pragmatic, proven frameworks to navigate modern dating and deep commitment." }
            ].map((pillar, i) => (
              <div key={i} className="glass p-8 rounded-2xl border border-white/10 hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-xl font-serif text-accent-gold mb-3">{pillar.title}</h3>
                <p className="text-gray-300 font-light text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <Link href="/webinar" className="btn-gold group">
              Start Your Journey For Free
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
