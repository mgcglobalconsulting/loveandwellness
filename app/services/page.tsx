import Link from "next/link";
import { ArrowRight, Sparkles, HeartHandshake } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: "vip",
      title: "VIP Intensive Day",
      subtitle: "The Ultimate Deep Dive",
      description: "A 6-hour private transformative experience mapping out your exact blocks and building your personalized relationship attraction protocol.",
      price: "$5,000",
      features: ["6 hours 1-on-1", "30 days Voxer support", "VIP Physical Stacked Gift Box", "Lifetime Masterclass Access"],
      link: "/vip",
      color: "border-accent-rose bg-gradient-to-br from-white to-accent-rose/10 shadow-glow-rose",
      icon: <Sparkles className="w-8 h-8 text-primary" />
    },
    {
      id: "group",
      title: "High-Ticket Group Coaching",
      subtitle: "8-Week Immersion",
      description: "Join an intimate, curated circle of women moving through my signature relationship rewriting curriculum.",
      price: "$2,500",
      features: ["8 Weekly Live Calls", "Private Community Chat", "Relationship Roadmap Workbooks", "Group Energy Sessions"],
      link: "/vip",
      color: "border-gray-100 bg-white hover:border-teal-light/50 shadow-sm",
      icon: <HeartHandshake className="w-8 h-8 text-teal-deep" />
    },
    {
      id: "masterclass",
      title: "Friday Masterclass Party",
      subtitle: "2-Hour Group Experience",
      description: "An exclusive Friday evening event designed to shift paradigms instantly. Must apply to attend.",
      price: "By Invitation",
      features: ["Live Training", "Q&A Hot Seats", "Exclusive Access to VIP Offers", "Maximum 20 women"],
      link: "/masterclass",
      color: "border-primary/20 bg-primary/5 hover:border-primary/40",
      icon: <StarIcon className="w-8 h-8 text-accent-gold" />
    }
  ];

  return (
    <div className="min-h-screen bg-cream text-text-primary pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <h1 className="section-heading text-primary mb-6">Ways We Can Work Together</h1>
          <p className="section-subheading text-gray-600">
            From free resources to high-level private mentorship, there is an entry point for wherever you are on your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
          {services.map((svc) => (
            <div key={svc.id} className={`p-8 rounded-3xl border-2 flex flex-col h-full transition-all duration-300 transform hover:-translate-y-2 ${svc.color}`}>
              <div className="mb-6 flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                  {svc.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-serif text-text-primary mb-2">{svc.title}</h3>
              <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4">{svc.subtitle}</p>
              
              <p className="text-gray-600 mb-8 flex-grow">{svc.description}</p>
              
              <div className="mb-8 pb-8 border-b border-gray-200/50">
                <p className="text-xs text-gray-500 mb-1 leading-none uppercase tracking-wider">Investment</p>
                <p className="text-3xl font-light text-primary">{svc.price}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {svc.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link href={svc.link} className={`btn-primary w-full group !py-3 bg-white border border-gray-200 text-text-primary shadow-none hover:bg-gray-50 ${svc.id === 'vip' ? '!bg-primary !text-white !border-primary hover:!bg-primary/90' : ''}`}>
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
