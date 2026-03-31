"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DollarSign, ShoppingBag, Loader2, ChevronDown } from "lucide-react";

type OrderStatus = "pending" | "paid" | "fulfilled" | "refunded";

interface Order {
  id: string;
  email: string;
  total_amount: number;
  status: OrderStatus;
  order_type: string;
  items: unknown;
  created_at: string;
}

const statusMeta: Record<
  OrderStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  pending: {
    label: "Pending",
    bg: "bg-yellow-400/15",
    text: "text-yellow-400",
    border: "border-yellow-400/30",
  },
  paid: {
    label: "Paid",
    bg: "bg-green-400/15",
    text: "text-green-400",
    border: "border-green-400/30",
  },
  fulfilled: {
    label: "Fulfilled",
    bg: "bg-blue-400/15",
    text: "text-blue-400",
    border: "border-blue-400/30",
  },
  refunded: {
    label: "Refunded",
    bg: "bg-red-400/15",
    text: "text-red-400",
    border: "border-red-400/30",
  },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders ?? []);
    }
    setLoading(false);
  }

  async function updateOrderStatus(id: string, status: OrderStatus) {
    setUpdatingId(id);
    const res = await fetch(`/api/admin/orders`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    }
    setUpdatingId(null);
  }

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  const totalRevenue = orders
    .filter((o) => o.status === "paid" || o.status === "fulfilled")
    .reduce((sum, o) => sum + Number(o.total_amount ?? 0), 0);

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl md:text-4xl font-light text-white mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Orders
        </h1>
        <p className="text-white/40 text-sm">
          Manage all shop orders and update their fulfillment status.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          icon={<DollarSign className="w-5 h-5 text-accent-gold" />}
          label="Total Revenue"
          value={`$${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          sub="paid + fulfilled"
        />
        <SummaryCard
          icon={<ShoppingBag className="w-5 h-5 text-accent-gold" />}
          label="Total Orders"
          value={orders.length}
          sub={`${pendingCount} pending`}
        />
        <SummaryCard
          icon={<ShoppingBag className="w-5 h-5 text-blue-400" />}
          label="Fulfilled"
          value={orders.filter((o) => o.status === "fulfilled").length}
          sub="completed"
        />
        <SummaryCard
          icon={<ShoppingBag className="w-5 h-5 text-red-400" />}
          label="Refunded"
          value={orders.filter((o) => o.status === "refunded").length}
          sub="refunds issued"
        />
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {(["all", "pending", "paid", "fulfilled", "refunded"] as const).map(
          (s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                filterStatus === s
                  ? "bg-primary/80 border-primary text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/30"
              }`}
            >
              {s === "all" ? "All" : statusMeta[s].label}
              {s !== "all" && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({orders.filter((o) => o.status === s).length})
                </span>
              )}
            </button>
          )
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-white/30">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30 text-sm">
          No orders found.
        </div>
      ) : (
        <div className="glass rounded-2xl border border-white/10 overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-white/10 text-white/30 text-xs font-semibold uppercase tracking-wider">
            <span>Customer</span>
            <span>Type</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-white/5">
            {filtered.map((order) => {
              const meta = statusMeta[order.status] ?? statusMeta.pending;
              const isUpdating = updatingId === order.id;
              return (
                <div
                  key={order.id}
                  className="px-6 py-4 grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center hover:bg-white/3 transition-colors"
                >
                  {/* Customer */}
                  <div>
                    <p className="text-white text-sm font-medium truncate">
                      {order.email}
                    </p>
                    <p className="text-white/30 text-xs font-mono">
                      #{order.id.slice(0, 8)}
                    </p>
                  </div>

                  {/* Type */}
                  <p className="text-white/60 text-sm capitalize hidden md:block">
                    {order.order_type?.replace(/_/g, " ") ?? "—"}
                  </p>

                  {/* Amount */}
                  <p className="text-accent-gold font-semibold text-sm">
                    ${Number(order.total_amount ?? 0).toFixed(2)}
                  </p>

                  {/* Date */}
                  <p className="text-white/40 text-xs hidden md:block">
                    {format(new Date(order.created_at), "MMM d, yyyy")}
                  </p>

                  {/* Status dropdown */}
                  <div className="relative">
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold w-fit ${meta.bg} ${meta.text} ${meta.border}`}
                    >
                      {isUpdating ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : null}
                      <select
                        className="bg-transparent appearance-none cursor-pointer pr-4 focus:outline-none"
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                        disabled={isUpdating}
                      >
                        {Object.entries(statusMeta).map(([key, val]) => (
                          <option key={key} value={key} className="bg-gray-900 text-white">
                            {val.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3 h-3 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub: string;
}) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-5">
      <div className="mb-2">{icon}</div>
      <p
        className="text-2xl font-light text-white"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {value}
      </p>
      <p className="text-white/40 text-xs mt-1">{label}</p>
      <p className="text-white/25 text-xs">{sub}</p>
    </div>
  );
}
