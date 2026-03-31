import { createClient as createServiceClient } from "@supabase/supabase-js";
import Link from "next/link";
import { format } from "date-fns";
import { User, Phone, Mail, Star, DollarSign } from "lucide-react";

interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  commitment_level: number;
  investment_comfort: string;
  relationship_status: string;
  referral_source: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export default async function ClientsPage() {
  const supabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("applications")
    .select(
      "id, full_name, email, phone, commitment_level, investment_comfort, relationship_status, referral_source, reviewed_at, created_at"
    )
    .eq("status", "approved")
    .order("reviewed_at", { ascending: false });

  const clients: Client[] = data ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl md:text-4xl font-light text-white mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Clients
        </h1>
        <p className="text-white/40 text-sm">
          All approved coaching applications — your active client roster.
        </p>
      </div>

      {/* Summary */}
      <div className="glass rounded-2xl border border-white/10 px-6 py-4 flex items-center gap-4">
        <User className="w-5 h-5 text-accent-gold" />
        <span className="text-white font-semibold text-lg">{clients.length}</span>
        <span className="text-white/40 text-sm">approved clients</span>
      </div>

      {/* Client list */}
      {error && (
        <div className="text-red-400 text-sm">
          Failed to load clients: {error.message}
        </div>
      )}

      {clients.length === 0 && !error && (
        <div className="text-center py-20 text-white/30 text-sm">
          No approved clients yet.{" "}
          <Link
            href="/admin/applications"
            className="text-accent-gold underline"
          >
            Review applications
          </Link>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="glass rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            {/* Name + badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/30 border border-primary/40 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {client.full_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">
                    {client.full_name}
                  </p>
                  <p className="text-white/40 text-xs capitalize">
                    {client.relationship_status}
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-400/15 text-green-400 border border-green-400/30 flex-shrink-0">
                Approved
              </span>
            </div>

            {/* Contact */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <Mail className="w-3 h-3" />
                <span className="truncate">{client.email}</span>
              </div>
              {client.phone && (
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <Phone className="w-3 h-3" />
                  <span>{client.phone}</span>
                </div>
              )}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 border-t border-white/8 pt-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-3 h-3 text-accent-gold" />
                <span className="text-white/60 text-xs">
                  {client.commitment_level}/10 commit
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-3 h-3 text-accent-gold" />
                <span className="text-white/60 text-xs truncate">
                  {client.investment_comfort}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/8">
              <span className="text-white/30 text-xs">
                Applied {format(new Date(client.created_at), "MMM d, yyyy")}
              </span>
              <Link
                href={`/admin/applications?id=${client.id}`}
                className="text-accent-gold text-xs hover:underline"
              >
                View application
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
