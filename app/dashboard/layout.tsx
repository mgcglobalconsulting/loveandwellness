"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Video,
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  Heart,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/webinars", label: "My Webinars", icon: Video },
  { href: "/dashboard/purchases", label: "Purchases", icon: ShoppingBag },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

interface UserProfile {
  full_name: string | null;
  avatar_url: string | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
        const { data } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", user.id)
          .single();
        if (data) setProfile(data);
      }
    }
    loadUser();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  function isActive(item: (typeof navItems)[0]) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  const displayName = profile?.full_name || userEmail?.split("@")[0] || "Member";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-gold to-primary flex items-center justify-center flex-shrink-0">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-serif text-white text-lg leading-none">
            Love &amp; Wellness
          </span>
        </Link>
      </div>

      {/* User info */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-white font-medium text-sm truncate">{displayName}</p>
            {userEmail && (
              <p className="text-white/50 text-xs truncate">{userEmail}</p>
            )}
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                active
                  ? "bg-primary/80 text-white shadow-glow"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon
                className={`w-5 h-5 flex-shrink-0 ${
                  active ? "text-accent-gold" : "group-hover:text-accent-gold transition-colors"
                }`}
              />
              <span className="font-accent font-medium text-sm tracking-wide">
                {item.label}
              </span>
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-gold" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-4 py-6 border-t border-white/10 space-y-2">
        <Link
          href="/apply"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-accent-gold/20 to-primary/20 border border-accent-gold/30 text-accent-gold text-sm font-accent font-semibold hover:from-accent-gold/30 hover:to-primary/30 transition-all duration-200"
        >
          <Heart className="w-4 h-4" />
          Work With Dr. Patricia
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-white/10 hover:text-white/80 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 group-hover:text-red-400 transition-colors" />
          <span className="font-accent font-medium text-sm tracking-wide">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-midnight flex-shrink-0 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-midnight/60 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-midnight transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile Top Bar */}
        <header className="lg:hidden sticky top-0 z-20 bg-midnight/95 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Heart className="w-5 h-5 text-accent-gold fill-accent-gold" />
            <span className="font-serif text-white text-base">Member Portal</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-semibold text-xs">
            {initials}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
