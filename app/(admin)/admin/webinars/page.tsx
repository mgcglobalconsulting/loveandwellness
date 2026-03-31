"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Video,
  Users,
  Calendar,
  Plus,
  Loader2,
  ChevronDown,
  ChevronUp,
  Save,
} from "lucide-react";

interface Webinar {
  id: string;
  title: string;
  description: string | null;
  webinar_type: "daily" | "masterclass_friday";
  scheduled_at: string;
  duration_minutes: number;
  max_attendees: number;
  is_active: boolean;
  registration_count?: number;
}

interface WebinarForm {
  title: string;
  description: string;
  webinar_type: "daily" | "masterclass_friday";
  scheduled_at: string;
  duration_minutes: number;
  max_attendees: number;
  is_active: boolean;
}

const emptyForm: WebinarForm = {
  title: "",
  description: "",
  webinar_type: "daily",
  scheduled_at: "",
  duration_minutes: 60,
  max_attendees: 100,
  is_active: true,
};

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState<WebinarForm>(emptyForm);
  const [editForms, setEditForms] = useState<Record<string, Partial<WebinarForm>>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchWebinars();
  }, []);

  async function fetchWebinars() {
    setLoading(true);
    const res = await fetch("/api/webinars");
    if (res.ok) {
      const data = await res.json();
      setWebinars(data.webinars ?? []);
    }
    setLoading(false);
  }

  async function handleAdd() {
    setSaving("new");
    const res = await fetch("/api/webinars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      await fetchWebinars();
      setForm(emptyForm);
      setShowAddForm(false);
    }
    setSaving(null);
  }

  async function handleUpdate(id: string) {
    setSaving(id);
    const patch = editForms[id] ?? {};
    const res = await fetch(`/api/webinars/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) {
      await fetchWebinars();
      setEditForms((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
    setSaving(null);
  }

  function setEdit(id: string, key: keyof WebinarForm, value: unknown) {
    setEditForms((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), [key]: value },
    }));
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1
            className="text-3xl md:text-4xl font-light text-white mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Webinars
          </h1>
          <p className="text-white/40 text-sm">
            Manage daily webinars and Friday masterclasses.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm((v) => !v)}
          className="btn-gold text-sm px-5 py-2.5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Webinar
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="glass rounded-2xl border border-white/15 p-6 space-y-5">
          <h2 className="text-white font-semibold text-sm uppercase tracking-wider">
            New Webinar
          </h2>
          <WebinarFormFields
            form={form}
            onChange={(k, v) => setForm((prev) => ({ ...prev, [k]: v }))}
          />
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAdd}
              disabled={saving === "new"}
              className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2"
            >
              {saving === "new" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Webinar
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-5 py-2.5 rounded-full border border-white/20 text-white/60 text-sm hover:border-white/40 hover:text-white transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Webinar list */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-white/30">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading…
        </div>
      ) : webinars.length === 0 ? (
        <div className="text-center py-20 text-white/30 text-sm">
          No webinars yet. Add one above.
        </div>
      ) : (
        <div className="space-y-3">
          {webinars.map((webinar) => {
            const isExpanded = expandedId === webinar.id;
            const patch = editForms[webinar.id] ?? {};
            const current = { ...webinar, ...patch };
            return (
              <div
                key={webinar.id}
                className="glass rounded-2xl border border-white/10 overflow-hidden"
              >
                {/* Row */}
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : webinar.id)
                  }
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/4 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Video className="w-4 h-4 text-accent-gold flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {webinar.title}
                      </p>
                      <p className="text-white/40 text-xs capitalize">
                        {webinar.webinar_type.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                    <div className="hidden sm:flex items-center gap-2 text-white/40 text-xs">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(webinar.scheduled_at), "MMM d, yyyy h:mm a")}
                    </div>
                    {webinar.registration_count !== undefined && (
                      <div className="flex items-center gap-1 text-white/40 text-xs">
                        <Users className="w-3 h-3" />
                        {webinar.registration_count}
                      </div>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                        webinar.is_active
                          ? "bg-green-400/15 text-green-400 border-green-400/30"
                          : "bg-white/5 text-white/40 border-white/10"
                      }`}
                    >
                      {webinar.is_active ? "Active" : "Inactive"}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-white/30" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/30" />
                    )}
                  </div>
                </button>

                {/* Edit panel */}
                {isExpanded && (
                  <div className="border-t border-white/10 px-6 py-6 space-y-5">
                    <WebinarFormFields
                      form={{
                        title: current.title,
                        description: current.description ?? "",
                        webinar_type: current.webinar_type,
                        scheduled_at: current.scheduled_at,
                        duration_minutes: current.duration_minutes,
                        max_attendees: current.max_attendees,
                        is_active: current.is_active,
                      }}
                      onChange={(k, v) => setEdit(webinar.id, k, v)}
                    />
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleUpdate(webinar.id)}
                        disabled={saving === webinar.id}
                        className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2"
                      >
                        {saving === webinar.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save Changes
                      </button>
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

function WebinarFormFields({
  form,
  onChange,
}: {
  form: WebinarForm;
  onChange: (key: keyof WebinarForm, value: unknown) => void;
}) {
  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/60";

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-1">
          Title
        </label>
        <input
          type="text"
          className={inputClass}
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Webinar title…"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-1">
          Description
        </label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={2}
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Short description…"
        />
      </div>
      <div>
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-1">
          Type
        </label>
        <select
          className={inputClass}
          value={form.webinar_type}
          onChange={(e) =>
            onChange("webinar_type", e.target.value as "daily" | "masterclass_friday")
          }
        >
          <option value="daily">Daily</option>
          <option value="masterclass_friday">Masterclass (Friday)</option>
        </select>
      </div>
      <div>
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-1">
          Scheduled At
        </label>
        <input
          type="datetime-local"
          className={inputClass}
          value={form.scheduled_at ? form.scheduled_at.slice(0, 16) : ""}
          onChange={(e) => onChange("scheduled_at", e.target.value)}
        />
      </div>
      <div>
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-1">
          Duration (minutes)
        </label>
        <input
          type="number"
          className={inputClass}
          value={form.duration_minutes}
          onChange={(e) => onChange("duration_minutes", Number(e.target.value))}
          min={15}
          max={240}
        />
      </div>
      <div>
        <label className="block text-white/40 text-xs uppercase tracking-wider mb-1">
          Max Attendees
        </label>
        <input
          type="number"
          className={inputClass}
          value={form.max_attendees}
          onChange={(e) => onChange("max_attendees", Number(e.target.value))}
          min={1}
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-white/40 text-xs uppercase tracking-wider">
          Active
        </label>
        <button
          type="button"
          onClick={() => onChange("is_active", !form.is_active)}
          className={`relative w-10 h-5 rounded-full border transition-all duration-200 ${
            form.is_active
              ? "bg-green-500/40 border-green-400/50"
              : "bg-white/10 border-white/20"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
              form.is_active ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
