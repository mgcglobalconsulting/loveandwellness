import Link from "next/link";

export function MasterclassCallout() {
  return (
    <section className="py-24 bg-bg-dark text-text-light relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-accent-gold mb-4">
          Every Friday, 7–10 PM EST
        </h2>
        
        <h3 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
          The Love & Wellness<br />Masterclass Experience
        </h3>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          An intimate, exclusive Friday evening dedicated to real breakthrough. 
          Limited to 20 seats per session. By qualification only.
        </p>
        
        <Link 
          href="/masterclass"
          className="inline-block border border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-bg-dark font-semibold tracking-wide uppercase py-4 px-10 transition-colors duration-300"
        >
          Secure Your Spot
        </Link>
      </div>
    </section>
  );
}
