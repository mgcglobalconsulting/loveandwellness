import Image from "next/image";
import Link from "next/link";
import { Check, Shield, Star, Heart } from "lucide-react";

export default function VIPOfferPage() {
  return (
    <div className="min-h-screen bg-cream text-text-primary pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wide mb-6">
            <Star className="w-4 h-4 fill-current" />
            APPLICATION APPROVED
          </div>
          <h1 className="section-heading mb-6 text-text-primary">
            The Ultimate <span className="text-gradient-plum">Love & Wellness</span> Transformation
          </h1>
          <p className="section-subheading text-gray-600">
            You've been accepted. Now, it's time to step into the relationship and life you were meant for. Choose your path below.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 animate-slide-up">
          
          {/* Group Coaching Card */}
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition-shadow relative overflow-hidden">
            <h2 className="text-2xl font-serif mb-2">High-Ticket Group Immersion</h2>
            <p className="text-gray-500 mb-6">An 8-week profound journey with a curated circle of women.</p>
            <div className="mb-8 pb-8 border-b border-gray-100">
              <span className="text-4xl font-light">$2,500</span>
              <span className="text-gray-500 ml-2">pay in full</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "8 Weeks of Live Group Coaching calls",
                "Private Community Support Chat",
                "Complete Relationship Audit & Roadmap",
                "Access to the VIP Vault of resources",
                "Group energy healing and breathwork sessions",
                "Priority email support securely between calls"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-teal-deep shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            
            <button className="btn-outline border-primary text-primary hover:bg-primary/5 w-full">
              Enroll in Group Journey
            </button>
          </div>

          {/* VIP Day Card */}
          <div className="glass-light rounded-3xl p-8 lg:p-10 shadow-glow-rose border-accent-rose flex flex-col relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-rose" />
            <div className="absolute -top-4 -right-4 bg-accent-gold text-midnight text-xs font-bold px-8 py-2 rotate-45 transform origin-bottom-right uppercase tracking-wider">
              Highest Value
            </div>
            
            <h2 className="text-3xl font-serif mb-2 text-primary">The VIP Intensive Day</h2>
            <p className="text-gray-600 mb-6">1-on-1 private access. A complete paradigm shift in 6 hours.</p>
            <div className="mb-8 pb-8 border-b border-gray-200">
              <span className="text-5xl font-light text-primary">$5,000</span>
              <span className="text-gray-500 ml-2">investment</span>
            </div>
            
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent-rose fill-current" />
              The Value Stack
            </h4>
            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Full 6-Hour Private Intensive with Dr. Patricia",
                "Deep dive into limiting beliefs & childhood patterns",
                "Custom 'Love Attraction' Strategy Protocol",
                "30 Days of Private Voxer/WhatsApp Access",
                "2x Follow-up Integration Calls (45 mins)",
                <span key="gift" className="font-semibold text-primary">Physical VIP Gift Box (Shipped directly to you)</span>,
                <span key="vault" className="font-semibold text-primary">Lifetime Access to the Masterclass Library</span>
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" />
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
            
            <button className="btn-primary w-full shadow-glow">
              Secure Your VIP Day
            </button>
            <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" /> Secure Stripe Checkout
            </p>
          </div>

        </div>
      </section>
      
      {/* Physical Stack Banner */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-2xl font-serif text-primary mb-6">What's in the VIP Stacked Gift Box?</h3>
          <p className="text-gray-600 mb-12">
            Every VIP client receives a curated physical package to support your journey.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Branded Journal", emoji: "📓" },
              { label: "Rose & Lavender Candle", emoji: "🕯️" },
              { label: "Healing Crystals", emoji: "💎" },
              { label: "30-Day Devotional", emoji: "📖" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-cream/50">
                <span className="text-4xl">{item.emoji}</span>
                <span className="font-medium text-text-primary text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
