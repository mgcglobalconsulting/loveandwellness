import { createClient as createServiceClient } from "@supabase/supabase-js";
import Link from "next/link";
import { format } from "date-fns";
import {
  FileText,
  ShoppingBag,
  DollarSign,
  Users,
  Video,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
} from "lucide-react";

const statusMeta: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "text-yellow-400" },
  approved: { label: "Approved", color: "text-green-400" },
  not_a_fit: { label: "Not a Fit", color: "text-red-400" },
  follow_up: { label: "Follow Up", color: "text-blue-400" },
};

const orderStatusMeta: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "text-yellow-400" },
  paid: { label: "Paid", color: "text-green-400" },
  fulfilled: { label: "Fulfilled", color: "text-blue-400" },
  refunded: { label: "Refunded", color: "text-red-400" },
};

export default async function AdminDashboard() {
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [
    { data: applications },
    { data: orders },
    { count: leadsCount },
    { count: registrationsCount },
  ] = await Promise.all([
    supabase
      .from("applications")
      .select("id, full_name, email, status, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("id, email, total_amount, order_type, status, created_at")
      .order("created_at", { ascending: false }),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase
      .from("webinar_registrations")
      .select("id", { count: "exact", head: true }),
  ]);

  const appList = applications ?? [];
  const orderList = orders ?? [];

  const totalRevenue = orderList
    .filter((o) => o.status === "paid" || o.status === "fulfilled")
    .reduce((sum, o) => sum + Number(o.total_amount ?? 0), 0);

  const appsByStatus = appList.reduce<Record<string, number>>((acc, app) => {
    acc[app.status] = (acc[app.status] ?? 0) + 1;
    return acc;
  }, {});

  const recentApps = appList.slice(0, 5);
  const recentOrders = orderList.slice(0, 5);

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <h1
          className="text-3xl md:text-4xl font-light text-white mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Overview
        </h1>
        <p className="text-white/40 text-sm">
          Welcome back — here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          label="Total Applications"
          value={appList.length}
          sub={`${appsByStatus.pending ?? 0} pending`}
          subColor="text-yellow-400"
        />
        <StatCard
          icon={<ShoppingBag className="w-5 h-5" />}
          label="Total Orders"
          value={orderList.length}
          sub={`${orderList.filter((o) => o.status === "pending").length} pending`}
          subColor="text-yellow-400"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          sub="paid + fulfilled"
          subColor="text-green-400"
        />
        <StatCard
          icon={<Video className="w-5 h-5" />}
          label="Registrations"
          value={registrationsCount ?? 0}
          sub="all webinars"
          subColor="text-white/40"
        />
      </div>

      {/* Application status breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { key: "pending", icon: <Clock className="w-4 h-4" />, color: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5" },
          { key: "approved", icon: <CheckCircle className="w-4 h-4" />, color: "text-green-400 border-green-400/20 bg-green-400/5" },
          { key: "not_a_fit", icon: <XCircle className="w-4 h-4" />, color: "text-red-400 border-red-400/20 bg-red-400/5" },
          { key: "follow_up", icon: <RefreshCw className="w-4 h-4" />, color: "text-blue-400 border-blue-400/20 bg-blue-400/5" },
        ].map(({ key, icon, color }) => (
          <div
            key={key}
            className={`rounded-xl border px-4 py-3 flex items-center gap-3 ${color}`}
          >
            {icon}
            <div>
              <p className="font-semibold text-lg leading-none">
                {appsByStatus[key] ?? 0}
              </p>
              <p className="text-xs opacity-70 mt-0.5 capitalize">
                {statusMeta[key].label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent items */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent applications */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold tracking-wide text-sm uppercase">
              Recent Applications
            </h2>
            <Link
              href="/admin/applications"
              className="text-accent-gold text-xs flex items-center gap-1 hover:underline"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentApps.length === 0 && (
              <p className="text-white/30 text-sm">No applications yet.</p>
            )}
            {recentApps.map((app) => {
              const meta = statusMeta[app.status] ?? statusMeta.pending;
              return (
                <div
                  key={app.id}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <div>
                    <p className="text-white text-sm font-medium">
                      {app.full_name}
                    </p>
                    <p className="text-white/40 text-xs">{app.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold ${meta.color}`}>
                      {meta.label}
                    </span>
                    <p className="text-white/30 text-xs mt-0.5">
                      {format(new Date(app.created_at), "MMM d")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5">
            <Link href="/admin/applications" className="btn-primary text-sm px-5 py-2.5 w-full text-center block">
              Review Applications
            </Link>
          </div>
        </div>

        {/* Recent orders */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold tracking-wide text-sm uppercase">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-accent-gold text-xs flex items-center gap-1 hover:underline"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 && (
              <p className="text-white/30 text-sm">No orders yet.</p>
            )}
            {recentOrders.map((order) => {
              const meta =
                orderStatusMeta[order.status] ?? orderStatusMeta.pending;
              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <div>
                    <p className="text-white text-sm font-medium">
                      {order.email}
                    </p>
                    <p className="text-white/40 text-xs capitalize">
                      {order.order_type?.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-accent-gold text-sm font-semibold">
                      ${Number(order.total_amount ?? 0).toFixed(2)}
                    </p>
                    <span className={`text-xs font-medium ${meta.color}`}>
                      {meta.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5">
            <Link href="/admin/orders" className="btn-gold text-sm px-5 py-2.5 w-full text-center block">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  subColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub: string;
  subColor: string;
}) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/10">
      <div className="flex items-center gap-2 text-accent-gold mb-3">{icon}</div>
      <p
        className="text-2xl md:text-3xl font-light text-white"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {value}
      </p>
      <p className="text-white/50 text-xs mt-1">{label}</p>
      <p className={`text-xs mt-1 font-medium ${subColor}`}>{sub}</p>
    </div>
  );
}
