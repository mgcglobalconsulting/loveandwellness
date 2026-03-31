import { Star, Quote } from "lucide-react";

export default function TestimonialsPage() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      role: "VIP Intensive Client",
      quote: "Working with Dr. Patricia completely dissolved my pattern of attracting emotionally unavailable men. Within 6 months of our intensive, I met the man I am now engaged to. The healing is real.",
      rating: 5
    },
    {
      id: 2,
      name: "Elena R.",
      role: "Masterclass Attendee",
      quote: "I thought I just needed dating advice. What I actually needed was radical self-forgiveness. The Friday Masterclass shifted my entire worldview in 2 hours.",
      rating: 5
    },
    {
      id: 3,
      name: "Jessica & David",
      role: "Couples Coaching",
      quote: "We were on the brink of divorce. The communication frameworks and energetic boundary work she taught us saved our marriage. Our connection is deeper now than when we first met.",
      rating: 5
    },
    {
      id: 4,
      name: "Amanda T.",
      role: "Group Coaching Alumni",
      quote: "There is nothing like being witnessed and held by other women doing this deep work. The 8 weeks I spent in Dr. Patricia's cohort were the most transformational of my life.",
      rating: 5
    },
    {
      id: 5,
      name: "Michelle L.",
      role: "VIP Intensive Client",
      quote: "The VIP day was intense, beautiful, and exactly what I needed. The physical gift box was such an elegant touch, but the real gift was finally feeling worthy of love.",
      rating: 5
    },
    {
      id: 6,
      name: "Rachel K.",
      role: "Webinar Attendee",
      quote: "I've attended dozens of webinars that were just 60-minute sales pitches. Patricia's training actually gave me a massive breakthrough on slide 12. Unbelievable value.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-cream text-text-primary pt-24 pb-24">
      
      {/* Header Section */}
      <section className="container mx-auto px-4 max-w-4xl text-center mb-16 animate-fade-in">
        <h1 className="section-heading mb-6 text-primary">
          Stories of <span className="text-gradient-plum">Transformation</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Read what happens when high-achieving women finally decide to stop settling and step into the radical self-love and partnership they deserve.
        </p>
      </section>

      {/* Masonry Grid */}
      <section className="container mx-auto px-4 max-w-7xl animate-slide-up">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="glass break-inside-avoid p-8 rounded-3xl border border-primary/10 hover:shadow-glow-rose transition-shadow duration-300 relative">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 rotate-180" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-gold text-accent-gold" />
                ))}
              </div>
              
              <p className="text-gray-700 italic leading-relaxed mb-6 font-serif text-lg">
                "{t.quote}"
              </p>
              
              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-text-primary">{t.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 text-center mt-24">
        <div className="max-w-3xl mx-auto p-12 bg-white rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-serif text-text-primary mb-6">Ready to write your own success story?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/apply" className="btn-primary shadow-glow">Apply for Coaching</a>
            <a href="/webinar" className="btn-outline border-primary text-primary hover:bg-primary/5">Watch Free Training</a>
          </div>
        </div>
      </section>

    </div>
  );
}
