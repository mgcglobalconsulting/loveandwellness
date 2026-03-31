import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Love & Wellness Coaching",
  description: "Privacy Policy for Love & Wellness Coaching.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-4xl text-text-primary mb-8 text-center">
          Privacy Policy
        </h1>
        
        <div className="prose prose-plum max-w-none text-text-primary/80">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-serif text-primary mt-10 mb-4">1. Introduction</h2>
          <p className="mb-6">
            Welcome to Love & Wellness Coaching. We respect your privacy and are committed 
            to protecting your personal data. This privacy policy will inform you as to how 
            we look after your personal data when you visit our website and tell you about 
            your privacy rights.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-10 mb-4">2. The Data We Collect</h2>
          <p className="mb-6">
            We may collect, use, store and transfer different kinds of personal data about you 
            which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Financial Data</strong> includes payment card details (processed securely via Stripe).</li>
            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products or services you have purchased from us.</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-10 mb-4">3. How We Use Your Data</h2>
          <p className="mb-6">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-10 mb-4">4. Data Security</h2>
          <p className="mb-6">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-10 mb-4">5. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
            <br /><br />
            <strong>Love & Wellness Coaching</strong><br />
            Email: <a href="mailto:support@loveandwellnesscoaching.com" className="text-primary hover:text-accent-gold underline">support@loveandwellnesscoaching.com</a>
          </p>

          <div className="mt-12 text-center">
            <Link href="/" className="btn-outline">Return to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
