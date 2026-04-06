"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { login } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleLogin(formData: FormData) {
    setIsPending(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
    setIsPending(false);
  }

  async function handleGoogleLogin() {
    setIsPending(true);
    setError(null);
    console.log("Google OAuth flow starting", {
      provider: "google",
      redirectTo: "https://loveandwellnesscoaching.vercel.app/dashboard",
    });

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://loveandwellnesscoaching.vercel.app/dashboard",
        },
      });

      console.log("Google OAuth result", { data, error });

      if (error) {
        setError(error.message);
        console.error("Google OAuth error", error);
        setIsPending(false);
        return;
      }

      if (data?.url) {
        console.log("Navigating to OAuth provider URL", data.url);
        window.location.assign(data.url);
        return;
      }

      setIsPending(false);
      console.warn("Google OAuth did not return a redirect URL or error");
    } catch (unexpected) {
      console.error("Unexpected Google OAuth exception", unexpected);
      setError("Unexpected authorization error. Check the browser console for details.");
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full glass p-8 md:p-10 rounded-3xl shadow-glow-rose relative overflow-hidden animate-slide-up">
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-rose" />
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-text-primary mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Sign in to your member portal</p>
        </div>
        
        <form className="space-y-6" action={handleLogin}>
          
          <button 
            type="button" 
            onClick={handleGoogleLogin}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl bg-white text-text-primary hover:bg-gray-50 transition-colors shadow-sm font-medium disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-cream text-gray-400">Or continue with email</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isPending}
                  className="form-input pl-10 disabled:opacity-50"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={isPending}
                  className="form-input pl-10 disabled:opacity-50"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-primary hover:text-primary-light transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" disabled={isPending} className="btn-primary w-full shadow-glow disabled:opacity-50">
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:text-primary-light transition-colors">
            Sign up
          </Link>
        </div>

      </div>

    </div>
  );
}
