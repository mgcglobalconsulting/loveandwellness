import Link from "next/link";
import { ArrowRight, Calendar, Users, Star } from "lucide-react";

export default function MasterclassPage() {
  return (
    <div className="min-h-screen bg-midnight text-text-light pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold text-sm font-semibold tracking-wide mb-6">
            <Star className="w-4 h-4 fill-current" />
            BY INVITATION OR QUALIFICATION ONLY
          </div>
          
          <h1 className="section-heading text-white mb-6">
            The Love & Wellness <br />
            <span className="text-gradient-gold">Masterclass Experience</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed">
            This is NOT a free webinar. This is an exclusive, intimate evening of transformation, breakthrough, and deep connection.
          </p>
        </div>

        {/* Details Card */}
        <div className="glass rounded-3xl p-8 md:p-12 mb-12 animate-slide-up relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32" />
          
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-3xl font-serif text-white mb-6">What to Expect</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-accent-gold" />
                  <p>Direct paradigm shifts from Dr. Patricia</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-accent-gold" />
                  <p>Live Q&A and relationship hot-seat coaching</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-accent-gold" />
                  <p>An environment of absolute psychological safety</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-accent-gold" />
                  <p>The opportunity to apply for VIP Mentorship</p>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col justify-center space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">WHEN</p>
                  <p className="text-lg font-semibold text-white">Every Friday, 7–10 PM EST</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">CAPACITY</p>
                  <p className="text-lg font-semibold text-white">Strictly limited to 20 seats</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h3 className="text-2xl font-serif text-white mb-6">Are you ready to claim your seat?</h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            To maintain the integrity of the group, registration requires a brief 3-question pre-qualification.
          </p>
          
          <Link href="/apply" className="btn-gold group text-lg flex items-center justify-center gap-2 mx-auto w-fit">
            Apply For Your Seat Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="mt-6 text-sm text-gray-500 font-medium tracking-wide">
            ONLY 4 SEATS REMAINING FOR THIS FRIDAY
          </p>
        </div>
        
      </div>
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal-deep/20 rounded-full blur-[150px]" />
      </div>
    </div>
  );
}
