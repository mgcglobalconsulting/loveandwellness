import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./ProfileForm";

export const metadata = {
  title: "Profile | Member Dashboard",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, avatar_url, created_at")
    .eq("id", user.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl md:text-5xl font-serif text-text-primary mb-2">
          My Profile
        </h1>
        <p className="text-gray-500 font-light">
          Manage your personal information and preferences.
        </p>
      </div>

      <ProfileForm
        initialData={{
          full_name: profile?.full_name ?? "",
          phone: profile?.phone ?? "",
          email: user.email ?? "",
          created_at: profile?.created_at ?? user.created_at ?? null,
        }}
      />
    </div>
  );
}
