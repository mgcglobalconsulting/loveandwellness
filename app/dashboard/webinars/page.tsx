import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Calendar, CheckCircle2, Clock, ExternalLink } from "lucide-react";

export const metadata = {
  title: "My Webinars | Member Dashboard",
};

function formatWebinarType(type: string): string {
  if (type === "daily_training") return "Daily Training";
  if (type === "friday_masterclass") return "Friday Masterclass";
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatDateTime(dateStr: string): { date: string; time: string } {
  const d = new Date(dateStr);
  return {
    date: d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }),
  };
}

type WebinarRegistration = {
  id: string;
  registered_at: string;
  attended: boolean;
  webinars: {
    id: string;
    title: string;
    description: string | null;
    webinar_type: string;
    scheduled_at: string;
    duration_minutes: number | null;
  } | null;
};

export default async function WebinarsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: registrations, error } = await supabase
    .from("webinar_registrations")
    .select(
      `
      id,
      registered_at,
      attended,
      webinars (
        id,
        title,
        description,
        webinar_type,
        scheduled_at,
        duration_minutes
      )
    `
    )
    .eq("user_id", user.id)
    .order("registered_at", { ascending: false });

  const now = new Date();

  const typedRegistrations = (registrations as WebinarRegistration[] | null) ?? [];

  // Sort: upcoming first, then past
  const sorted = [...typedRegistrations].sort((a, b) => {
    const aDate = a.webinars?.scheduled_at
      ? new Date(a.webinars.scheduled_at)
      : null;
    const bDate = b.webinars?.scheduled_at
      ? new Date(b.webinars.scheduled_at)
      : null;
    const aUpcoming = aDate ? aDate > now : false;
    const bUpcoming = bDate ? bDate > now : false;
    if (aUpcoming && !bUpcoming) return -1;
    if (!aUpcoming && bUpcoming) return 1;
    if (aDate && bDate) return aDate.getTime() - bDate.getTime();
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-serif text-text-primary mb-2">
          My Webinars
        </h1>
        <p className="text-gray-500 font-light">
          Your registered trainings and masterclasses with Dr. Patricia.
        </p>
      </div>

      {/* Empty State */}
      {sorted.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-serif text-2xl text-text-primary mb-2">
            No Webinars Yet
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mb-7 font-light">
            You haven't registered for any webinars or trainings yet. Join Dr.
            Patricia's next free training and begin your transformation.
          </p>
          <Link href="/webinar" className="btn-primary">
            Register for a Free Training
          </Link>
        </div>
      )}

      {/* Registration Cards */}
      {sorted.length > 0 && (
        <div className="space-y-4">
          {sorted.map((reg) => {
            const webinar = reg.webinars;
            const isUpcoming =
              webinar?.scheduled_at
                ? new Date(webinar.scheduled_at) > now
                : false;
            const dt = webinar?.scheduled_at
              ? formatDateTime(webinar.scheduled_at)
              : null;

            return (
              <div
                key={reg.id}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glass ${
                  isUpcoming
                    ? "border-primary/20"
                    : "border-gray-100"
                }`}
              >
                {isUpcoming && (
                  <div className="h-1 bg-gradient-to-r from-primary to-primary-light" />
                )}
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Type badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {webinar?.webinar_type && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-accent font-semibold bg-teal-deep/10 text-teal-deep">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-deep flex-shrink-0" />
                            {formatWebinarType(webinar.webinar_type)}
                          </span>
                        )}
                        {isUpcoming ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-accent font-semibold bg-primary/10 text-primary">
                            <Clock className="w-3 h-3" />
                            Upcoming
                          </span>
                        ) : reg.attended ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-accent font-semibold bg-green-50 text-green-700 border border-green-200">
                            <CheckCircle2 className="w-3 h-3" />
                            Attended
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-accent font-semibold bg-gray-100 text-gray-500">
                            Registered
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-xl text-text-primary leading-snug mb-1">
                        {webinar?.title || "Webinar"}
                      </h3>

                      {webinar?.description && (
                        <p className="text-gray-500 text-sm font-light line-clamp-2 mb-3">
                          {webinar.description}
                        </p>
                      )}

                      {dt && (
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-primary/60" />
                            {dt.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-primary/60" />
                            {dt.time}
                          </span>
                          {webinar?.duration_minutes && (
                            <span className="text-gray-400">
                              {webinar.duration_minutes} min
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {isUpcoming && (
                      <Link
                        href="/webinar"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/30 text-primary text-sm font-accent font-semibold hover:bg-primary/5 transition-colors flex-shrink-0"
                      >
                        Details
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CTA to register more */}
      {sorted.length > 0 && (
        <div className="bg-gradient-to-br from-cream to-accent-blush rounded-2xl border border-accent-rose/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl text-text-primary mb-1">
              Ready for another session?
            </h3>
            <p className="text-gray-500 text-sm font-light">
              Join the next free training with Dr. Patricia.
            </p>
          </div>
          <Link href="/webinar" className="btn-primary whitespace-nowrap flex-shrink-0">
            Register Now
          </Link>
        </div>
      )}
    </div>
  );
}
