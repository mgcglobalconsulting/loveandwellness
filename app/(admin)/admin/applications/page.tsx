"use client";

import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock,
  Loader2,
} from "lucide-react";

type ApplicationStatus = "pending" | "approved" | "not_a_fit" | "follow_up";

interface Application {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  relationship_status: string;
  biggest_challenge: string;
  already_tried: string;
  commitment_level: number;
  investment_comfort: string;
  referral_source: string | null;
  status: ApplicationStatus;
  admin_notes: string | null;
  created_at: string;
  reviewed_at: string | null;
}

const STATUS_TABS: { key: ApplicationStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "not_a_fit", label: "Not a Fit" },
  { key: "follow_up", label: "Follow Up" },
];

const statusBadge: Record<ApplicationStatus, string> = {
  pending: "bg-yellow-400/15 text-yellow-400 border-yellow-400/30",
  approved: "bg-green-400/15 text-green-400 border-green-400/30",
  not_a_fit: "bg-red-400/15 text-red-400 border-red-400/30",
  follow_up: "bg-blue-400/15 text-blue-400 border-blue-400/30",
};

const statusLabel: Record<ApplicationStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  not_a_fit: "Not a Fit",
  follow_up: "Follow Up",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ApplicationStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    const url =
      activeTab === "all"
        ? "/api/applications"
        : `/api/applications?status=${activeTab}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      setApplications(data.applications ?? []);
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    setUpdatingId(id);
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, admin_notes: notes[id] ?? undefined }),
    });
    if (res.ok) {
      const { application } = await res.json();
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...application } : a))
      );
    }
    setUpdatingId(null);
  };

  const filtered =
    activeTab === "all"
      ? applications
      : applications.filter((a) => a.status === activeTab);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl md:text-4xl font-light text-white mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Applications
        </h1>
        <p className="text-white/40 text-sm">
          Review, approve, or manage all VIP coaching applications.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeTab === key
                ? "bg-primary/80 border-primary text-white"
                : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/30"
            }`}
          >
            {label}
            {key !== "all" && (
              <span className="ml-1.5 text-xs opacity-60">
                ({applications.filter((a) => a.status === key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-white/30">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30 text-sm">
          No applications in this category.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const isExpanded = expandedId === app.id;
            const isUpdating = updatingId === app.id;
            return (
              <div
                key={app.id}
                className="glass rounded-2xl border border-white/10 overflow-hidden"
              >
                {/* Row */}
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : app.id)
                  }
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/4 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {app.full_name}
                      </p>
                      <p className="text-white/40 text-xs truncate">
                        {app.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                    <div className="hidden sm:flex items-center gap-3 text-xs text-white/40">
                      <span>Commit: {app.commitment_level}/10</span>
                      <span className="hidden md:inline">
                        {app.investment_comfort}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${statusBadge[app.status]}`}
                    >
                      {statusLabel[app.status]}
                    </span>
                    <span className="text-white/30 text-xs hidden sm:block">
                      {format(new Date(app.created_at), "MMM d, yyyy")}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-white/30" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/30" />
                    )}
                  </div>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-white/10 px-6 py-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-5">
                      <Detail label="Phone" value={app.phone} />
                      <Detail
                        label="Relationship Status"
                        value={app.relationship_status}
                      />
                      <Detail
                        label="Commitment Level"
                        value={`${app.commitment_level} / 10`}
                      />
                      <Detail
                        label="Investment Comfort"
                        value={app.investment_comfort}
                      />
                      <Detail
                        label="Referral Source"
                        value={app.referral_source ?? "—"}
                      />
                      <Detail
                        label="Submitted"
                        value={format(
                          new Date(app.created_at),
                          "MMM d, yyyy h:mm a"
                        )}
                      />
                    </div>
                    <Detail
                      label="Biggest Challenge"
                      value={app.biggest_challenge}
                      multiline
                    />
                    <Detail
                      label="Already Tried"
                      value={app.already_tried}
                      multiline
                    />

                    {/* Admin notes */}
                    <div>
                      <label className="block text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                        Admin Notes
                      </label>
                      <textarea
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/60 resize-none"
                        rows={3}
                        placeholder="Internal notes…"
                        defaultValue={app.admin_notes ?? ""}
                        onChange={(e) =>
                          setNotes((prev) => ({
                            ...prev,
                            [app.id]: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <ActionButton
                        icon={<CheckCircle className="w-4 h-4" />}
                        label="Approve"
                        onClick={() => updateStatus(app.id, "approved")}
                        loading={isUpdating}
                        active={app.status === "approved"}
                        colorClass="bg-green-500/20 text-green-400 border-green-400/30 hover:bg-green-500/30"
                      />
                      <ActionButton
                        icon={<XCircle className="w-4 h-4" />}
                        label="Not a Fit"
                        onClick={() => updateStatus(app.id, "not_a_fit")}
                        loading={isUpdating}
                        active={app.status === "not_a_fit"}
                        colorClass="bg-red-500/20 text-red-400 border-red-400/30 hover:bg-red-500/30"
                      />
                      <ActionButton
                        icon={<RefreshCw className="w-4 h-4" />}
                        label="Follow Up"
                        onClick={() => updateStatus(app.id, "follow_up")}
                        loading={isUpdating}
                        active={app.status === "follow_up"}
                        colorClass="bg-blue-500/20 text-blue-400 border-blue-400/30 hover:bg-blue-500/30"
                      />
                      <ActionButton
                        icon={<Clock className="w-4 h-4" />}
                        label="Reset Pending"
                        onClick={() => updateStatus(app.id, "pending")}
                        loading={isUpdating}
                        active={app.status === "pending"}
                        colorClass="bg-yellow-500/20 text-yellow-400 border-yellow-400/30 hover:bg-yellow-500/30"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className={multiline ? "col-span-full" : ""}>
      <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-white/80 text-sm leading-relaxed">{value}</p>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  loading,
  active,
  colorClass,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  loading: boolean;
  active: boolean;
  colorClass: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || active}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${colorClass} ${
        active ? "opacity-50 cursor-default ring-1 ring-current" : ""
      } disabled:cursor-not-allowed`}
    >
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : icon}
      {label}
    </button>
  );
}
