"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Phone, Mail, Calendar, Check, AlertCircle, Loader2 } from "lucide-react";

const schema = z.object({
  full_name: z
    .string()
    .min(2, "Please enter your full name (at least 2 characters)")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(30, "Phone number is too long")
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

interface ProfileFormProps {
  initialData: {
    full_name: string;
    phone: string;
    email: string;
    created_at: string | null;
  };
}

function formatMemberSince(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [toast, setToast] = useState<ToastState>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: initialData.full_name,
      phone: initialData.phone,
    },
  });

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  }

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/dashboard/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        showToast("error", json.error ?? "Something went wrong. Please try again.");
        return;
      }

      reset(data);
      showToast("success", "Profile updated successfully.");
    } catch {
      showToast("error", "Network error. Please check your connection.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`flex items-start gap-3 px-5 py-4 rounded-2xl border transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {toast.type === "success" ? (
            <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      )}

      {/* Account Info (read-only) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h2 className="font-serif text-xl text-text-primary mb-4">
          Account Details
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-accent font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate">{initialData.email}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Contact support to change your email address.
            </p>
          </div>

          <div>
            <label className="block text-xs font-accent font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
              Member Since
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
              <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                {formatMemberSince(initialData.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Profile Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-serif text-xl text-text-primary mb-6">
          Personal Information
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="full_name"
              className="block text-sm font-accent font-semibold text-gray-700 mb-2"
            >
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="full_name"
                type="text"
                {...register("full_name")}
                placeholder="Your full name"
                disabled={isSubmitting}
                className="form-input pl-10 disabled:opacity-50"
              />
            </div>
            {errors.full_name && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-accent font-semibold text-gray-700 mb-2"
            >
              Phone Number{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="(555) 000-0000"
                disabled={isSubmitting}
                className="form-input pl-10 disabled:opacity-50"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
            {!isDirty && !isSubmitting && (
              <p className="text-xs text-gray-400 mt-2">
                No unsaved changes.
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Decorative bottom quote */}
      <div className="text-center py-4">
        <p className="script-accent text-primary/40 text-2xl leading-none">
          Your journey is sacred.
        </p>
      </div>
    </div>
  );
}
