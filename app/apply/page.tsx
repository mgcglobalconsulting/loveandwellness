import type { Metadata } from "next";
import { ApplicationForm } from "@/components/apply/ApplicationForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Apply for Coaching",
  description:
    "Apply to work directly with Dr. Patricia George. This program is by application only — for those serious about transforming their love life.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-cream pt-24">
      {/* Header */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0D0A14 0%, #1A0A2A 60%, #0D0A14 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/patricia/0276-03 05 2023 lindon patricia wedding -jax-photography.jpg')",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="script-accent text-accent-gold mb-4">By Invitation Only</p>
          <h1 className="section-heading text-white mb-6">
            Apply to Work with<br />
            <span className="text-gradient-gold">Dr. Patricia George</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            This is not an open enrollment program. Dr. Patricia personally
            reviews every application and only accepts clients she knows she
            can help transform.
          </p>
        </div>
      </section>

      {/* Qualification note */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-3xl p-8 shadow-glass border border-primary/10">
          <div className="flex gap-6 items-start">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent-gold/40 flex-shrink-0">
              <Image
                src="/images/patricia/0003_patricia_lindon_jax_photography_ md 7 21 2022_.jpg"
                alt="Dr. Patricia George"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="font-display text-lg italic text-text-primary leading-relaxed">
                "I read every application personally. If I believe I can help
                you, you'll hear from me within 48–72 hours. If we're not the
                right fit, I'll point you toward the best resources for where
                you are right now. Either way — applying takes courage, and I
                honor that."
              </p>
              <p className="text-primary text-sm font-accent font-semibold mt-3">
                — Dr. Patricia George
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <ApplicationForm />
      </section>
    </div>
  );
}
