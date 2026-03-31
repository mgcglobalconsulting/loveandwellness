import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Calendar, ShoppingBag, Clock, ArrowRight, Star } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatWebinarType(type: string) {
  if (type === "daily_training") return "Daily Training";
  if (type === "friday_masterclass") return "Friday Masterclass";
  return type;
}

export const metadata = {
  title: "Dashboard | Love & Wellness Coaching",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, created_at")
    .eq("id", user.id)
    .single();

  // Fetch upcoming webinar registrations (with webinar details)
  const { data: allRegistrations } = await supabase
    .from("webinar_registrations")
    .select(
      `
      id,
      registered_at,
      attended,
      webinars (
        id,
        title,
        scheduled_at,
        webinar_type
      )
    `
    )
    .eq("user_id", user.id)
    .order("registered_at", { ascending: false });

  const now = new Date();
  const upcomingCount =
    allRegistrations?.filter((r) => {
      const w = r.webinars as { scheduled_at?: string } | null;
      return w?.scheduled_at && new Date(w.scheduled_at) > now;
    }).length ?? 0;

  // Fetch orders
  const { data: orders } = await supabase
    .from("orders")
    .select("id, created_at, order_type, total_amount, status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const totalOrders = orders?.length ?? 0;
  const recentOrders = orders?.slice(0, 3) ?? [];
  const recentRegistrations = allRegistrations?.slice(0, 2) ?? [];

  const memberSince = profile?.created_at
    ? formatDate(profile.created_at)
    : formatDate(user.created_at ?? new Date().toISOString());

  const firstName =
    profile?.full_name?.split(" ")[0] ||
    user.email?.split("@")[0] ||
    "Friend";

  const stats = [
    {
      label: "Upcoming Webinars",
      value: upcomingCount,
      icon: Calendar,
      color: "text-primary",
      bg: "bg-primary/10",
      href: "/dashboard/webinars",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-teal-deep",
      bg: "bg-teal-deep/10",
      href: "/dashboard/purchases",
    },
    {
      label: "Member Since",
      value: memberSince,
      icon: Clock,
      color: "text-accent-gold",
      bg: "bg-accent-gold/10",
      href: null,
    },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-gray-100 text-gray-600",
    paid: "bg-amber-50 text-amber-700 border border-amber-200",
    fulfilled: "bg-green-50 text-green-700 border border-green-200",
    refunded: "bg-red-50 text-red-600 border border-red-200",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Welcome */}
      <div>
        <p className="script-accent text-primary leading-none mb-1">
          Welcome back,
        </p>
        <h1 className="text-4xl md:text-5xl font-serif text-text-primary">
          {firstName}
        </h1>
        <p className="text-gray-500 mt-2 font-light">
          Here's a snapshot of your journey with Dr. Patricia.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const card = (
            <div
              className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-200 ${
                stat.href
                  ? "hover:-translate-y-1 hover:shadow-glass cursor-pointer"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                {stat.href && (
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                )}
              </div>
              <p
                className={`text-2xl font-serif font-semibold ${stat.color} leading-none mb-1`}
              >
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href} className="group">
              {card}
            </Link>
          ) : (
            <div key={stat.label}>{card}</div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif text-xl text-text-primary">Recent Orders</h2>
            <Link
              href="/dashboard/purchases"
              className="text-primary text-sm font-accent font-semibold hover:text-primary-light transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <ShoppingBag className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No orders yet</p>
                <Link
                  href="/shop"
                  className="text-primary text-sm font-semibold hover:underline mt-1 inline-block"
                >
                  Visit the shop
                </Link>
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="px-6 py-4 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate capitalize">
                      {(order.order_type as string)?.replace(/_/g, " ") || "Order"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(order.created_at as string)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-semibold text-sm text-text-primary">
                      {formatCurrency(Number(order.total_amount))}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${
                        statusColors[(order.status as string) ?? "pending"] ??
                        statusColors.pending
                      }`}
                    >
                      {order.status as string}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Webinars */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif text-xl text-text-primary">
              My Webinars
            </h2>
            <Link
              href="/dashboard/webinars"
              className="text-primary text-sm font-accent font-semibold hover:text-primary-light transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentRegistrations.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <Calendar className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No registrations yet</p>
                <Link
                  href="/webinar"
                  className="text-primary text-sm font-semibold hover:underline mt-1 inline-block"
                >
                  Register for a webinar
                </Link>
              </div>
            ) : (
              recentRegistrations.map((reg) => {
                const webinar = reg.webinars as {
                  title?: string;
                  scheduled_at?: string;
                  webinar_type?: string;
                } | null;
                const isUpcoming =
                  webinar?.scheduled_at
                    ? new Date(webinar.scheduled_at) > now
                    : false;
                return (
                  <div key={reg.id} className="px-6 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {webinar?.title || "Webinar"}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {webinar?.scheduled_at
                            ? formatDate(webinar.scheduled_at)
                            : formatDate(reg.registered_at as string)}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${
                          isUpcoming
                            ? "bg-primary/10 text-primary"
                            : reg.attended
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isUpcoming
                          ? "Upcoming"
                          : reg.attended
                          ? "Attended"
                          : "Registered"}
                      </span>
                    </div>
                    {webinar?.webinar_type && (
                      <p className="text-xs text-teal-deep mt-1 font-medium">
                        {formatWebinarType(webinar.webinar_type)}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* CTA Card */}
      <div className="relative overflow-hidden rounded-3xl bg-midnight p-8 md:p-10">
        <div className="absolute inset-0 bg-gradient-plum opacity-60" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
              <span className="text-accent-gold text-xs font-accent font-semibold uppercase tracking-widest">
                VIP Opportunity
              </span>
            </div>
            <h3 className="font-serif text-3xl text-white mb-2">
              Ready for the next level?
            </h3>
            <p className="text-white/60 font-light max-w-md">
              Apply to work directly with Dr. Patricia and experience a
              transformation that changes everything.
            </p>
          </div>
          <Link
            href="/apply"
            className="btn-gold flex-shrink-0 whitespace-nowrap"
          >
            Apply Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
