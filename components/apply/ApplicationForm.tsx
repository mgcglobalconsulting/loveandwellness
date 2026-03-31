"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";

const schema = z.object({
  full_name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  relationship_status: z.string().min(1, "Please select your status"),
  biggest_challenge: z
    .string()
    .min(50, "Please share at least a few sentences about your challenge"),
  already_tried: z.string().min(20, "Please share what you've tried before"),
  commitment_level: z.string().min(1, "Please rate your commitment"),
  investment_comfort: z.string().min(1, "Please select your comfort level"),
  referral_source: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-glass">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-primary" />
        </div>
        <h2 className="font-serif text-3xl text-text-primary mb-4">
          Your Application Is In
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
          Dr. Patricia's eyes will be on your application within 48–72 hours.
          Please check your email — including your spam folder — for her
          personal response.
        </p>
        <div className="mt-8 p-6 bg-cream rounded-2xl">
          <p className="text-primary text-sm font-accent font-semibold uppercase tracking-wider mb-1">
            What happens next?
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            If Dr. Patricia believes she can help you, you'll receive a
            personal email with a link to book a discovery call. During that
            call, you'll discuss your situation in depth and she'll walk you
            through your options for working together.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-3xl p-8 md:p-10 shadow-glass space-y-6"
    >
      <div>
        <h2 className="font-serif text-2xl text-text-primary mb-1">
          Your Application
        </h2>
        <p className="text-gray-500 text-sm">
          All fields are required unless marked optional. Be as honest and
          specific as possible — Dr. Patricia reads every word.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-accent font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            {...register("full_name")}
            className="form-input"
            placeholder="Your full name"
          />
          {errors.full_name && (
            <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-accent font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            {...register("email")}
            type="email"
            className="form-input"
            placeholder="you@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-accent font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            {...register("phone")}
            type="tel"
            className="form-input"
            placeholder="(555) 000-0000"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-accent font-semibold text-gray-700 mb-2">
            Current Relationship Status *
          </label>
          <select {...register("relationship_status")} className="form-input">
            <option value="">Select...</option>
            <option value="single">Single — looking for love</option>
            <option value="dating">Dating — seeking clarity</option>
            <option value="relationship">In a relationship</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced / Separated</option>
          </select>
          {errors.relationship_status && (
            <p className="text-red-500 text-xs mt-1">{errors.relationship_status.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-accent font-semibold text-gray-700 mb-2">
          What is your biggest challenge in love and relationships right now? *
        </label>
        <textarea
          {...register("biggest_challenge")}
          rows={4}
          className="form-textarea"
          placeholder="Be specific — the more you share, the better Dr. Patricia can assess how she can help you..."
        />
        {errors.biggest_challenge && (
          <p className="text-red-500 text-xs mt-1">{errors.biggest_challenge.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-accent font-semibold text-gray-700 mb-2">
          What have you already tried to address this? *
        </label>
        <textarea
          {...register("already_tried")}
          rows={3}
          className="form-textarea"
          placeholder="Therapy, other coaching, books, programs, etc..."
        />
        {errors.already_tried && (
          <p className="text-red-500 text-xs mt-1">{errors.already_tried.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-accent font-semibold text-gray-700 mb-2">
            On a scale of 1–10, how committed are you to changing this? *
          </label>
          <select {...register("commitment_level")} className="form-input">
            <option value="">Select...</option>
            {[10, 9, 8, 7, 6, 5].map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 10 ? "— I will do whatever it takes" : n >= 8 ? "— Very committed" : "— Fairly committed"}
              </option>
            ))}
            {[4, 3, 2, 1].map((n) => (
              <option key={n} value={String(n)}>
                {n} — Still exploring
              </option>
            ))}
          </select>
          {errors.commitment_level && (
            <p className="text-red-500 text-xs mt-1">{errors.commitment_level.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-accent font-semibold text-gray-700 mb-2">
            Investment comfort level *
          </label>
          <select {...register("investment_comfort")} className="form-input">
            <option value="">Select...</option>
            <option value="under_500">Under $500</option>
            <option value="500_1000">$500 – $1,000</option>
            <option value="1000_2500">$1,000 – $2,500</option>
            <option value="2500_5000">$2,500 – $5,000</option>
            <option value="5000_plus">$5,000+</option>
          </select>
          {errors.investment_comfort && (
            <p className="text-red-500 text-xs mt-1">{errors.investment_comfort.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-accent font-semibold text-gray-700 mb-2">
          How did you hear about Dr. Patricia? (optional)
        </label>
        <select {...register("referral_source")} className="form-input">
          <option value="">Select...</option>
          <option value="webinar">Free Training / Webinar</option>
          <option value="masterclass">Friday Masterclass</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="referral">Friend / Referral</option>
          <option value="google">Google Search</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Disclaimer */}
      <div className="bg-cream rounded-2xl p-5 text-xs text-gray-500 leading-relaxed">
        By submitting this application, you understand that this is not a
        commitment to purchase, and Dr. Patricia is not obligated to accept
        your application. You'll be contacted personally within 48–72 business
        hours.
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full flex items-center justify-center gap-2 text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting Your Application...
          </>
        ) : (
          "Submit My Application →"
        )}
      </button>
    </form>
  );
}
