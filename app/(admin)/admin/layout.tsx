import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  LayoutDashboard,
  FileText,
  Users,
  Video,
  ShoppingBag,
  BarChart3,
  Shield,
  Menu,
} from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/webinars", label: "Webinars", icon: Video },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen flex" style={{ background: "#0D0A14" }}>
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-midnight border-r border-white/10 flex-shrink-0">
        {/* Brand */}
        <div className="px-6 py-7 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-accent-gold" />
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
              Admin Portal
            </span>
          </div>
          <p className="text-white/50 text-xs mt-1 font-light">
            Love &amp; Wellness Coaching
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200 text-sm font-medium group"
            >
              <Icon className="w-4 h-4 group-hover:text-accent-gold transition-colors duration-200" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User footer */}
        <div className="px-6 py-5 border-t border-white/10">
          <p className="text-white/30 text-xs truncate">{user.email}</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-midnight border-b border-white/10 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent-gold" />
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold">
            Admin Portal
          </span>
        </div>
        {/* Mobile nav scroll */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all text-xs font-medium whitespace-nowrap"
            >
              <Icon className="w-3 h-3" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen pt-14 md:pt-0 overflow-x-hidden">
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
