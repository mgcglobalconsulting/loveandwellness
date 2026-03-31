"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, Sparkles, Shield } from "lucide-react";

const PRESET_AMOUNTS = [25, 50, 100, 250];

function DonateForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSuccess = searchParams.get("success") === "true";

  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAnonymous) {
      setDonorName("");
      setDonorEmail("");
    }
  }, [isAnonymous]);

  const resolvedAmount =
    selectedAmount === "custom" ? parseFloat(customAmount) : selectedAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!resolvedAmount || isNaN(resolvedAmount) || resolvedAmount < 5) {
      setError("Please enter a donation amount of at least $5.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: resolvedAmount,
          donor_name: isAnonymous ? "" : donorName,
          donor_email: isAnonymous ? "" : donorEmail,
          message,
          is_anonymous: isAnonymous,
        }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      router.push(data.url);
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 pt-24 pb-20">
        <div className="max-w-lg w-full text-center glass-light rounded-3xl p-12 shadow-lg border border-white/60 animate-fade-in">
          {/* Heart animation */}
          <div className="relative inline-block mb-8">
            <Heart className="w-20 h-20 text-primary fill-current mx-auto animate-pulse" />
            <span className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</span>
          </div>
          <p className="script-accent text-primary mb-3">Thank you!</p>
          <h1 className="text-3xl md:text-4xl font-serif text-text-primary mb-6">
            Your Generosity Is Felt
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8 font-light">
            Your donation helps Dr. Patricia continue her sacred mission — empowering women to love deeply, heal boldly, and live fully. Every contribution creates a ripple of transformation.
          </p>
          <p className="text-gray-500 text-sm mb-10 italic">
            A receipt has been sent to your email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="btn-primary">
              Return Home
            </a>
            <a href="/webinar" className="btn-outline border-primary text-primary hover:bg-primary/5">
              Join the Free Masterclass
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-text-primary pt-24 pb-20">
      {/* Hero */}
      <section className="container mx-auto px-4 max-w-3xl text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wide mb-6">
          <Heart className="w-4 h-4 fill-current" />
          GIVE WITH LOVE
        </div>
        <h1 className="section-heading mb-6 text-primary">
          Support Dr. Patricia&apos;s{" "}
          <span className="text-gradient-gold">Mission</span>
        </h1>
        <p className="section-subheading text-gray-600 max-w-xl mx-auto">
          Your gift helps more women access the healing, wisdom, and love they so deeply deserve.
        </p>
        <p className="script-accent text-primary/60 mt-4">From heart to heart</p>
      </section>

      {/* Mission Context */}
      <section className="container mx-auto px-4 max-w-5xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              title: "Heal & Transform",
              desc: "Funding scholarships and reduced-cost coaching for women who cannot afford full programs.",
            },
            {
              icon: Sparkles,
              title: "Expand the Reach",
              desc: "Creating free resources, content, and community spaces that reach women around the world.",
            },
            {
              icon: Shield,
              title: "Sustain the Work",
              desc: "Keeping the sacred containers open so Dr. Patricia can serve with full presence and devotion.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg text-text-primary mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Form */}
      <section className="bg-midnight py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-plum opacity-40" />
        <div className="container mx-auto px-4 max-w-xl relative z-10">
          <div className="glass rounded-3xl p-8 md:p-10 border border-white/10 glow-gold animate-slide-up">
            <h2 className="text-2xl font-serif text-cream mb-2 text-center">
              Make a Donation
            </h2>
            <p className="text-gray-400 text-sm text-center mb-8">
              Every dollar is a seed of love planted in a woman&apos;s future.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Preset amounts */}
              <div>
                <label className="block text-cream/80 text-sm font-medium mb-3">
                  Choose an Amount
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`py-3 rounded-xl font-semibold text-base border-2 transition-all duration-200 ${
                        selectedAmount === amt
                          ? "border-accent-gold bg-accent-gold/20 text-accent-gold"
                          : "border-white/20 bg-white/5 text-cream hover:border-accent-gold/50"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAmount("custom")}
                  className={`mt-3 w-full py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-200 ${
                    selectedAmount === "custom"
                      ? "border-accent-gold bg-accent-gold/20 text-accent-gold"
                      : "border-white/20 bg-white/5 text-cream hover:border-accent-gold/50"
                  }`}
                >
                  Custom Amount
                </button>
              </div>

              {/* Custom amount input */}
              {selectedAmount === "custom" && (
                <div>
                  <label className="block text-cream/80 text-sm font-medium mb-2">
                    Enter Amount (minimum $5)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      min={5}
                      step="1"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/20 bg-white/10 text-cream placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              {/* Anonymous toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={isAnonymous}
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`w-10 h-6 rounded-full transition-colors duration-200 shrink-0 relative ${
                    isAnonymous ? "bg-accent-gold" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                      isAnonymous ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-cream/80 text-sm">Donate anonymously</span>
              </div>

              {/* Donor fields */}
              {!isAnonymous && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-cream/80 text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-cream placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/80 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-cream placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-cream/80 text-sm font-medium mb-2">
                  Leave a Message{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Share what this gift means to you…"
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-cream placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm text-center bg-red-500/10 px-4 py-3 rounded-xl border border-red-400/20">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <span className="w-4 h-4 border-2 border-midnight/40 border-t-midnight rounded-full animate-spin" />
                    Processing…
                  </span>
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    <Heart className="w-4 h-4 fill-current" />
                    Donate{" "}
                    {selectedAmount !== "custom"
                      ? `$${selectedAmount}`
                      : customAmount
                      ? `$${customAmount}`
                      : ""}
                  </span>
                )}
              </button>

              <p className="text-center text-gray-400 text-xs flex items-center justify-center gap-1.5">
                <Shield className="w-3 h-3" />
                Secured by Stripe — your information is always protected
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Gratitude */}
      <section className="container mx-auto px-4 max-w-3xl text-center py-20">
        <p className="script-accent text-primary mb-4">From my heart</p>
        <h2 className="text-3xl md:text-4xl font-serif text-text-primary mb-6">
          Your Generosity Changes Lives
        </h2>
        <p className="text-gray-600 text-lg font-light leading-relaxed max-w-xl mx-auto">
          Every gift, large or small, helps a woman discover her worth, break free from toxic patterns, and step into the love she was born for. Thank you for being part of this sacred mission.
        </p>
        <p className="script-accent text-primary/70 mt-6 text-2xl">— Dr. Patricia</p>
      </section>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <DonateForm />
    </Suspense>
  );
}
