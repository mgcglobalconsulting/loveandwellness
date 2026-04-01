import Link from "next/link";
import { ArrowRight, Sparkles, HeartHandshake } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ways We Can Work Together",
  description:
    "Explore Dr. Patricia George's coaching offerings — from free training to high-level private mentorship. There is an entry point for wherever you are on your journey.",
};

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const services = [
  {
    id: "vip",
    title: "VIP Intensive Day",
    subtitle: "The Ultimate Deep Dive",
    description:
      "A private, full-day transformative experience — mapping out your exact relational blocks and building your personalized strategy for lasting change.",
    cta: "Apply for VIP",
    features: [
      "6 hours 1-on-1 with Dr. Patricia",
      "30 days Voxer support",
      "VIP Physical Stacked Gift Box",
      "Lifetime Masterclass Access",
    ],
    link: "/apply",
    color:
      "border-accent-rose bg-gradient-to-br from-white to-accent-rose/10 shadow-glow-rose",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
  },
  {
    id: "group",
    title: "Group Coaching Immersion",
    subtitle: "8-Week Transformation Journey",
    description:
      "Join an intimate, curated circle moving through Dr. Patricia's signature relationship rewriting curriculum — together.",
    cta: "Apply for Group",
    features: [
      "8 Weekly Live Coaching Calls",
      "Private Community Support",
      "Relationship Roadmap Workbooks",
      "Accountability & Group Sessions",
    ],
    link: "/apply",
    color: "border-gray-100 bg-white hover:border-teal-light/50 shadow-sm",
    icon: <HeartHandshake className="w-8 h-8 text-teal-deep" />,
  },
  {
    id: "masterclass",
    title: "Friday Masterclass Party",
    subtitle: "Weekly Live Group Experience",
    description:
      "An exclusive Friday evening training designed to shift your paradigms instantly. Spaces are limited — application required.",
    cta: "Apply to Attend",
    features: [
      "Live Training with Dr. Patricia",
      "Q&A Hot Seats",
      "Community of Aligned Women",
      "Maximum 20 attendees",
    ],
    link: "/masterclass",
    color: "border-primary/20 bg-primary/5 hover:border-primary/40",
    icon: <StarIcon className="w-8 h-8 text-accent-gold" />,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-cream text-text-primary pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <p
            className="script-accent text-primary mb-3"
            style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}
          >
            Work with Dr. Patricia
          </p>
          <h1 className="section-heading text-primary mb-6">
            Ways We Can Work Together
          </h1>
          <p className="section-subheading text-gray-600">
            From free training to high-level private mentorship, there is an
            entry point for wherever you are on your journey.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`p-8 rounded-3xl border-2 flex flex-col h-full transition-all duration-300 transform hover:-translate-y-2 ${svc.color}`}
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                  {svc.icon}
                </div>
              </div>

              <h3 className="text-2xl font-serif text-text-primary mb-2">
                {svc.title}
              </h3>
              <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-4">
                {svc.subtitle}
              </p>
              <p className="text-gray-600 mb-8 flex-grow">{svc.description}</p>

              <ul className="space-y-3 mb-8">
                {svc.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={svc.link}
                className={`btn-primary w-full group !py-3 bg-white border border-gray-200 text-text-primary shadow-none hover:bg-gray-50 ${
                  svc.id === "vip"
                    ? "!bg-primary !text-white !border-primary hover:!bg-primary/90"
                    : ""
                }`}
              >
                {svc.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 pt-16 border-t border-gray-200">
          <p className="script-accent text-primary mb-3" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
            Not sure where to start?
          </p>
          <p className="text-gray-600 max-w-lg mx-auto mb-8 leading-relaxed">
            Begin with the free training — Dr. Patricia will guide you to the
            right level of support from there.
          </p>
          <Link href="/webinar" className="btn-gold">
            Join the Free Training →
          </Link>
        </div>
      </div>
    </div>
  );
}
