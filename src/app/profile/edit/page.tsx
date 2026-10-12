import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfileEditForm } from "@/components/profile/profile-edit-form";
import { ProfileState } from "@/components/profile/profile-state";
import { getServerSession } from "@/lib/auth-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "প্রোফাইল সম্পাদনা",
  description: "আপনার বাজার দর প্রোফাইলের প্রদর্শিত নাম হালনাগাদ করুন।",
};

export default async function ProfileEditPage() {
  let session: Awaited<ReturnType<typeof getServerSession>>;

  try {
    session = await getServerSession();
  } catch {
    return (
      <ProfileState
        title="প্রোফাইল সম্পাদনা লোড করা যায়নি"
        description="অ্যাকাউন্ট সেবার সঙ্গে সংযোগ করা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।"
        retryHref="/profile/edit"
      />
    );
  }

  if (!session) {
    redirect("/signin?callbackUrl=%2Fprofile%2Fedit");
  }

  return <ProfileEditForm currentName={session.user.name} email={session.user.email} />;
}
