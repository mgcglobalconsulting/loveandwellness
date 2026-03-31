import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ShoppingBag, Package, Receipt } from "lucide-react";

export const metadata = {
  title: "Purchases | Member Dashboard",
};

type Order = {
  id: string;
  created_at: string;
  order_type: string;
  total_amount: number;
  status: string;
  items: unknown;
};

type StatusKey = "pending" | "paid" | "fulfilled" | "refunded";

const statusConfig: Record<
  StatusKey,
  { label: string; classes: string }
> = {
  pending: {
    label: "Pending",
    classes: "bg-gray-100 text-gray-600",
  },
  paid: {
    label: "Paid",
    classes:
      "bg-amber-50 text-amber-700 border border-amber-200",
  },
  fulfilled: {
    label: "Fulfilled",
    classes:
      "bg-green-50 text-green-700 border border-green-200",
  },
  refunded: {
    label: "Refunded",
    classes: "bg-red-50 text-red-600 border border-red-200",
  },
};

function getStatusConfig(status: string) {
  return (
    statusConfig[(status as StatusKey)] ?? {
      label: status,
      classes: "bg-gray-100 text-gray-600",
    }
  );
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatOrderType(type: string): string {
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function PurchasesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: orders } = await supabase
    .from("orders")
    .select("id, created_at, order_type, total_amount, status, items")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const typedOrders = (orders as Order[] | null) ?? [];

  // Totals summary
  const totalSpent = typedOrders
    .filter((o) => o.status === "paid" || o.status === "fulfilled")
    .reduce((acc, o) => acc + Number(o.total_amount), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary mb-2">
            Purchases
          </h1>
          <p className="text-gray-500 font-light">
            Your complete order history.
          </p>
        </div>
        {typedOrders.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 text-right">
            <p className="text-xs font-accent font-semibold text-gray-400 uppercase tracking-widest mb-1">
              Total Invested
            </p>
            <p className="font-serif text-2xl text-primary font-semibold">
              {formatCurrency(totalSpent)}
            </p>
          </div>
        )}
      </div>

      {/* Empty State */}
      {typedOrders.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-deep/10 flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-8 h-8 text-teal-deep" />
          </div>
          <h2 className="font-serif text-2xl text-text-primary mb-2">
            No Purchases Yet
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-7 font-light">
            You haven't made any purchases yet. Explore Dr. Patricia's resources
            and begin your journey.
          </p>
          <Link href="/shop" className="btn-primary">
            Visit the Shop
          </Link>
        </div>
      )}

      {/* Orders Table */}
      {typedOrders.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-accent font-semibold text-gray-400 uppercase tracking-widest">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-accent font-semibold text-gray-400 uppercase tracking-widest">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-accent font-semibold text-gray-400 uppercase tracking-widest">
                    Type
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-accent font-semibold text-gray-400 uppercase tracking-widest">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-accent font-semibold text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {typedOrders.map((order) => {
                  const status = getStatusConfig(order.status);
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Receipt className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-xs text-gray-400 font-mono">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(order.created_at)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-text-primary">
                          {formatOrderType(order.order_type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-text-primary">
                          {formatCurrency(Number(order.total_amount))}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`text-xs px-3 py-1.5 rounded-full font-accent font-semibold ${status.classes}`}
                        >
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {typedOrders.map((order) => {
              const status = getStatusConfig(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-sm">
                          {formatOrderType(order.order_type)}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-accent font-semibold flex-shrink-0 ${status.classes}`}
                    >
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </span>
                    <span className="font-semibold text-text-primary">
                      {formatCurrency(Number(order.total_amount))}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Shop CTA */}
      {typedOrders.length > 0 && (
        <div className="bg-gradient-to-br from-midnight to-primary/80 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl text-white mb-1">
              Continue your journey
            </h3>
            <p className="text-white/60 text-sm font-light">
              Explore more resources from Dr. Patricia.
            </p>
          </div>
          <Link
            href="/shop"
            className="btn-gold whitespace-nowrap flex-shrink-0"
          >
            Browse Shop
          </Link>
        </div>
      )}
    </div>
  );
}
