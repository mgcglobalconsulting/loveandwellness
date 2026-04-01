import Link from "next/link";
import Image from "next/image";

// Placeholder data for the shop preview
const placeholderProducts = [
  {
    id: "1",
    name: "Love & Wellness Signature Journal",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Rose & Lavender Intentions Candle",
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Healing Crystal Set",
    image: "https://images.unsplash.com/photo-1515089309-84384bfbde0e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Daily Affirmation Cards",
    image: "https://images.unsplash.com/photo-1585834882583-057bfd21095d?q=80&w=600&auto=format&fit=crop",
  },
];

export function ShopPreview() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
              The Boutique
            </h2>
            <h3 className="text-4xl font-serif text-text-primary mb-4">
              The Love & Wellness Collection
            </h3>
            <p className="text-gray-600 text-lg">
              Curated tools to support your daily wellness practice and relationship intentions.
            </p>
          </div>
          
          <Link 
            href="/shop"
            className="mt-6 md:mt-0 whitespace-nowrap inline-flex items-center text-primary font-semibold hover:text-primary-light transition-colors group"
          >
            Explore the Collection
            <svg 
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {placeholderProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 relative mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>
              
              <h4 className="text-lg font-serif text-text-primary mb-1">
                {product.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
