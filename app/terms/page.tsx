import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Love & Wellness Coaching",
  description: "Terms of Service for Love & Wellness Coaching.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-4xl text-text-primary mb-8 text-center">
          Terms of Service
        </h1>
        
        <div className="prose prose-plum max-w-none text-text-primary/80">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-serif text-primary mt-10 mb-4">1. Agreement to Terms</h2>
          <p className="mb-6">
            By accessing our website at loveandwellnesscoaching.com, you agree to be bound by these 
            Terms of Service and to comply with all applicable laws and regulations. If you do not 
            agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-10 mb-4">2. Coaching Services</h2>
          <p className="mb-6">
            The coaching services provided by Dr. Patricia George are meant for educational and 
            personal growth purposes. They do not substitute professional medical advice, psychiatric 
            care, or therapy. By participating in any program, you acknowledge that you are fully 
            responsible for your own well-being and decisions.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-10 mb-4">3. Intellectual Property</h2>
          <p className="mb-6">
            The materials contained in this website, including but not limited to text, graphics, 
            logos, images, training videos, and course content are protected by applicable copyright 
            and trademark law. You may not modify, copy, reproduce, republish, or distribute any 
            material from this site without our prior written consent.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-10 mb-4">4. Payments and Refunds</h2>
          <p className="mb-6">
            All payments for coaching programs, VIP days, group coaching, and shop items are securely 
            processed via Stripe. Refund policies vary by specific program or product and will be 
            stated clearly on the respective checkout page. Typically, live coaching services and 
            digital goods are non-refundable due to the nature of the service delivery.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-10 mb-4">5. Modifications</h2>
          <p className="mb-6">
            Love & Wellness Coaching may revise these terms of service at any time without notice. 
            By using this website you are agreeing to be bound by the then current version of these 
            terms of service.
          </p>

          <div className="mt-12 text-center">
            <Link href="/" className="btn-outline">Return to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
