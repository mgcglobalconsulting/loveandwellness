import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";

export default function ShopPage() {
  const products = [
    {
      id: "journal",
      name: "The 'Attracting Love' Journal",
      price: "$35.00",
      category: "Wellness & Lifestyle",
      image: "/images/og-image.jpg", // Placeholder
      description: "A 90-day guided prompt journal designed to restructure your limiting beliefs around relationships."
    },
    {
      id: "candle",
      name: "Sacred Space Soy Candle",
      price: "$45.00",
      category: "Wellness & Lifestyle",
      image: "/images/og-image.jpg", // Placeholder
      description: "Hand-poured rose and lavender infused soy candle to elevate the energy of your home."
    },
    {
      id: "cards",
      name: "Love & Worthiness Affirmation Deck",
      price: "$28.00",
      category: "Digital & Print",
      image: "/images/og-image.jpg", // Placeholder
      description: "52 beautifully designed cards with daily affirmations channeled by Dr. Patricia."
    },
    {
      id: "crystal",
      name: "Rose Quartz Heart Set",
      price: "$55.00",
      category: "Crystals & Energy",
      image: "/images/og-image.jpg", // Placeholder
      description: "Ethically sourced, reiki-infused rose quartz pieces for your nightstand or altar."
    }
  ];

  return (
    <div className="min-h-screen bg-cream text-text-primary pt-24 pb-20">
      
      {/* Header Section */}
      <section className="container mx-auto px-4 max-w-6xl mb-16 animate-fade-in">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wide mb-6">
            <ShoppingBag className="w-4 h-4" />
            THE COLLECTION
          </div>
          <h1 className="section-heading mb-6 text-primary">
            Curated Wellness & <span className="text-gradient-gold">Lifestyle</span>
          </h1>
          <p className="section-subheading text-gray-600">
            Elevate your daily rituals. All physical items are also included in the VIP 1-on-1 Intensive Gift Box.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 max-w-6xl mb-24 animate-slide-up">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-glow-rose transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="aspect-square relative bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="btn-gold !py-2 !px-6 shadow-glow">Add sequence</button>
                </div>
                {/* Fallback pattern since we don't have real images yet */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-rose text-primary/30 font-serif text-2xl group-hover:scale-105 transition-transform duration-500">
                  <div className="w-20 h-20 border border-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 opacity-50" />
                  </div>
                  {product.name}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs font-bold uppercase tracking-wider text-accent-gold mb-2">{product.category}</p>
                <h3 className="text-lg font-serif text-text-primary mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-text-primary font-light text-xl mb-4">{product.price}</p>
                <p className="text-sm text-gray-500 mb-6 flex-grow">{product.description}</p>
                
                <button className="w-full py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
