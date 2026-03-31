import { createClient as createServiceClient } from "@supabase/supabase-js";
import { format } from "date-fns";
import {
  Users,
  FileText,
  DollarSign,
  Heart,
  TrendingUp,
  Video,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
} from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [
    { count: leadsCount },
    { data: applications },
    { data: orders },
    { data: donations },
    { count: registrationsCount },
  ] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase
      .from("applications")
      .select("id, status, referral_source, investment_comfort, commitment_level, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("id, email, total_amount, status, order_type, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("donations")
      .select("id, donor_email, amount, created_at, is_anonymous")
      .order("created_at", { ascending: false }),
    supabase
      .from("webinar_registrations")
      .select("id", { count: "exact", head: true }),
  ]);

  const appList = applications ?? [];
  const orderList = orders ?? [];
  const donationList = donations ?? [];

  const totalApps = appList.length;
  const approvedApps = appList.filter((a) => a.status === "approved").length;
  const pendingApps = appList.filter((a) => a.status === "pending").length;
  const notFitApps = appList.filter((a) => a.status === "not_a_fit").length;
  const followUpApps = appList.filter((a) => a.status === "follow_up").length;

  const totalRevenue = orderList
    .filter((o) => o.status === "paid" || o.status === "fulfilled")
    .reduce((sum, o) => sum + Number(o.total_amount ?? 0), 0);

  const totalDonations = donationList.reduce(
    (sum, d) => sum + Number(d.amount ?? 0),
    0
  );

  const conversionRate =
    leadsCount && leadsCount > 0
      ? ((totalApps / leadsCount) * 100).toFixed(1)
      : "—";

  const approvalRate =
    totalApps > 0 ? ((approvedApps / totalApps) * 100).toFixed(1) : "—";

  // Group by referral source
  const sourceCounts: Record<string, number> = {};
  for (const app of appList) {
    const src = app.referral_source ?? "Unknown";
    sourceCounts[src] = (sourceCounts[src] ?? 0) + 1;
  }
  const sortedSources = Object.entries(sourceCounts).sort(
    ([, a], [, b]) => b - a
  );

  // Group orders by type
  const orderTypeCounts: Record<string, number> = {};
  const orderTypeRevenue: Record<string, number> = {};
  for (const order of orderList.filter(
    (o) => o.status === "paid" || o.status === "fulfilled"
  )) {
    const t = order.order_type ?? "unknown";
    orderTypeCounts[t] = (orderTypeCounts[t] ?? 0) + 1;
    orderTypeRevenue[t] =
      (orderTypeRevenue[t] ?? 0) + Number(order.total_amount ?? 0);
  }
  const sortedOrderTypes = Object.entries(orderTypeRevenue).sort(
    ([, a], [, b]) => b - a
  );

  // Recent activity (last 10 events combined)
  type ActivityItem = {
    type: string;
    label: string;
    detail: string;
    date: string;
    color: string;
  };
  const recentActivity: ActivityItem[] = [
    ...appList.slice(0, 5).map((a) => ({
      type: "application",
      label: a.status === "pending" ? "New Application" : `Application ${a.status.replace("_", " ")}`,
      detail: `— commitment ${a.commitment_level ?? "?"}`,
      date: a.created_at,
      color: "text-yellow-400",
    })),
    ...orderList.slice(0, 5).map((o) => ({
      type: "order",
      label: `Order ${o.status}`,
      detail: `$${Number(o.total_amount ?? 0).toFixed(2)} · ${o.order_type?.replace(/_/g, " ") ?? ""}`,
      date: o.created_at,
      color: "text-green-400",
    })),
    ...donationList.slice(0, 3).map((d) => ({
      type: "donation",
      label: "Donation received",
      detail: `$${Number(d.amount ?? 0).toFixed(2)}${d.is_anonymous ? " (anonymous)" : ""}`,
      date: d.created_at,
      color: "text-accent-gold",
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 12);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1
          className="text-3xl md:text-4xl font-light text-white mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Analytics
        </h1>
        <p className="text-white/40 text-sm">
          Funnel metrics, revenue, and lead insights.
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          icon={<Users className="w-4 h-4" />}
          label="Total Leads"
          value={leadsCount ?? 0}
          color="text-blue-400"
        />
        <MetricCard
          icon={<Video className="w-4 h-4" />}
          label="Registrations"
          value={registrationsCount ?? 0}
          color="text-teal-400"
        />
        <MetricCard
          icon={<FileText className="w-4 h-4" />}
          label="Applications"
          value={totalApps}
          color="text-yellow-400"
        />
        <MetricCard
          icon={<TrendingUp className="w-4 h-4" />}
          label="Conv. Rate"
          value={`${conversionRate}%`}
          color="text-purple-400"
        />
        <MetricCard
          icon={<DollarSign className="w-4 h-4" />}
          label="Revenue"
          value={`$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
          color="text-green-400"
        />
        <MetricCard
          icon={<Heart className="w-4 h-4" />}
          label="Donations"
          value={`$${totalDonations.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
          color="text-accent-gold"
        />
      </div>

      {/* Application Funnel */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl border border-white/10 p-6">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            Application Funnel
          </h2>
          <div className="space-y-3">
            {[
              { label: "Leads Captured", count: leadsCount ?? 0, icon: <Users className="w-4 h-4" />, color: "bg-blue-400" },
              { label: "Applications Submitted", count: totalApps, icon: <FileText className="w-4 h-4" />, color: "bg-yellow-400" },
              { label: "Pending Review", count: pendingApps, icon: <Clock className="w-4 h-4" />, color: "bg-orange-400" },
              { label: "Follow Up", count: followUpApps, icon: <RefreshCw className="w-4 h-4" />, color: "bg-blue-500" },
              { label: "Approved", count: approvedApps, icon: <CheckCircle className="w-4 h-4" />, color: "bg-green-400" },
              { label: "Not a Fit", count: notFitApps, icon: <XCircle className="w-4 h-4" />, color: "bg-red-400" },
            ].map(({ label, count, icon, color }) => {
              const max = leadsCount ?? Math.max(totalApps, 1);
              const pct = max > 0 ? Math.round((count / max) * 100) : 0;
              return (
                <div key={label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-white/60">
                      {icon}
                      {label}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/30">{pct}%</span>
                      <span className="text-white font-semibold w-6 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%`, opacity: 0.7 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-white/8 flex items-center justify-between text-xs text-white/40">
            <span>Approval rate</span>
            <span className="text-green-400 font-semibold">{approvalRate}%</span>
          </div>
        </div>

        {/* Lead sources */}
        <div className="glass rounded-2xl border border-white/10 p-6">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            Lead Sources
          </h2>
          {sortedSources.length === 0 ? (
            <p className="text-white/30 text-sm">No data yet.</p>
          ) : (
            <div className="space-y-3">
              {sortedSources.map(([source, count]) => {
                const pct = totalApps > 0 ? Math.round((count / totalApps) * 100) : 0;
                return (
                  <div key={source} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60 capitalize truncate max-w-[65%]">
                        {source}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-white/30">{pct}%</span>
                        <span className="text-white font-semibold">{count}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-gold rounded-full"
                        style={{ width: `${pct}%`, opacity: 0.6 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Revenue by order type + Recent activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue breakdown */}
        <div className="glass rounded-2xl border border-white/10 p-6">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            Revenue by Type
          </h2>
          {sortedOrderTypes.length === 0 ? (
            <p className="text-white/30 text-sm">No paid orders yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/30 text-xs border-b border-white/8">
                  <th className="text-left pb-2 font-semibold">Type</th>
                  <th className="text-right pb-2 font-semibold">Orders</th>
                  <th className="text-right pb-2 font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {sortedOrderTypes.map(([type, revenue]) => (
                  <tr
                    key={type}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-2.5 text-white/70 capitalize">
                      {type.replace(/_/g, " ")}
                    </td>
                    <td className="py-2.5 text-right text-white/40">
                      {orderTypeCounts[type] ?? 0}
                    </td>
                    <td className="py-2.5 text-right text-accent-gold font-semibold">
                      ${revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/15">
                  <td colSpan={2} className="pt-3 text-white/40 text-xs font-semibold uppercase">
                    Total
                  </td>
                  <td className="pt-3 text-right text-green-400 font-bold">
                    ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        {/* Recent activity feed */}
        <div className="glass rounded-2xl border border-white/10 p-6">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            Recent Activity
          </h2>
          {recentActivity.length === 0 ? (
            <p className="text-white/30 text-sm">No recent activity.</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-4 py-2 border-b border-white/5 last:border-0"
                >
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold ${item.color}`}>
                      {item.label}
                    </p>
                    <p className="text-white/40 text-xs truncate mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                  <p className="text-white/25 text-xs flex-shrink-0">
                    {format(new Date(item.date), "MMM d, h:mm a")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-4">
      <div className={`mb-2 ${color}`}>{icon}</div>
      <p
        className="text-xl md:text-2xl font-light text-white"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {value}
      </p>
      <p className="text-white/40 text-xs mt-1">{label}</p>
    </div>
  );
}
