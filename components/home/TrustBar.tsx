export function TrustBar() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="py-4 md:py-0">
            <div className="text-4xl font-serif text-primary mb-2">200+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Lives Transformed</div>
          </div>
          <div className="py-4 md:py-0">
            <div className="text-4xl font-serif text-primary mb-2">15+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="py-4 md:py-0">
            <div className="text-4xl font-serif text-primary mb-2">4.9★</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
