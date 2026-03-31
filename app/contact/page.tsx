import { Mail, MapPin, Clock, Heart } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach out to Dr. Patricia George and the Love & Wellness Coaching team. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream text-text-primary pb-24">

      {/* Hero — couple image fades into cream */}
      <section className="relative overflow-hidden" style={{ minHeight: "480px" }}>
        {/* Background image — right side, portrait crop */}
        <div className="absolute inset-0">
          <Image
            src="/images/assets/apply-for-coaching.jpeg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Heavy fade from left so text is readable */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #FAF6F1 35%, rgba(250,246,241,0.7) 60%, rgba(250,246,241,0.15) 100%)" }} />
          {/* Fade to cream at bottom so it blends into page */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(250,246,241,0.2) 0%, rgba(250,246,241,0.5) 70%, #FAF6F1 100%)" }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-6xl flex items-center" style={{ minHeight: "480px" }}>
          <div className="max-w-xl pt-24 pb-20 animate-fade-in">
            <p className="script-accent text-primary mb-2">Let's Connect</p>
            <h1 className="section-heading text-text-primary mb-6">
              We'd Love to<br />Hear From You
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you have questions about coaching, want to learn more about our programs, or simply need guidance on where to start — we are here for you.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 animate-slide-up">
            <h2 className="text-2xl font-serif text-text-primary mb-2">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-8">We typically respond within 1–2 business days.</p>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <input
                    type="text"
                    placeholder="Your first name"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    placeholder="Your last name"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <select className="form-input">
                  <option value="">Select a topic</option>
                  <option value="coaching">Coaching Inquiry</option>
                  <option value="vip">VIP Day Questions</option>
                  <option value="masterclass">Masterclass / Webinar</option>
                  <option value="group">Group Coaching</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us a little about yourself and how we can help..."
                  className="form-textarea"
                />
              </div>

              <button
                type="button"
                className="btn-primary w-full"
              >
                Send Message
              </button>

              <p className="text-xs text-center text-gray-400">
                This form is for general inquiries. For a coaching application, please visit our{" "}
                <a href="/apply" className="text-primary underline underline-offset-2">Apply page</a>.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up">

            {/* Info Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: <Mail className="w-5 h-5 text-primary" />,
                  label: "Email Us",
                  value: "hello@loveandwellnesscoaching.com",
                  sub: "For general inquiries and support",
                },
                {
                  icon: <Clock className="w-5 h-5 text-teal-deep" />,
                  label: "Response Time",
                  value: "1–2 Business Days",
                  sub: "Monday – Friday, 9 AM – 5 PM EST",
                },
                {
                  icon: <MapPin className="w-5 h-5 text-accent-gold" />,
                  label: "Location",
                  value: "Baltimore, Maryland",
                  sub: "Serving clients nationwide & globally",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-0.5">{item.label}</p>
                    <p className="font-medium text-text-primary">{item.value}</p>
                    <p className="text-sm text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dark CTA Card */}
            <div className="bg-midnight rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <Heart className="w-8 h-8 text-accent-gold mx-auto mb-4 fill-accent-gold/20" />
                <h3 className="text-2xl font-serif text-white mb-3">Ready to Transform?</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  If you're ready to stop waiting and start becoming the woman who attracts extraordinary love — apply for coaching today.
                </p>
                <a href="/apply" className="btn-gold">
                  Apply for Coaching
                </a>
              </div>
            </div>

            {/* Social / Free Resource */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-primary/20 text-center">
              <p className="text-sm text-gray-500 mb-1">New here?</p>
              <p className="font-serif text-text-primary mb-3">Start with our free training</p>
              <a href="/webinar" className="btn-primary !py-2.5 !px-6 text-sm">
                Join the Free Webinar
              </a>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
