import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfileCard } from "@/components/profile/profile-card";
import { ProfileState } from "@/components/profile/profile-state";
import { getServerSession } from "@/lib/auth-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "আমার প্রোফাইল",
  description: "আপনার বাজার দর অ্যাকাউন্টের প্রোফাইল তথ্য দেখুন।",
};

export default async function ProfilePage() {
  let session: Awaited<ReturnType<typeof getServerSession>>;

  try {
    session = await getServerSession();
  } catch {
    return (
      <ProfileState
        title="প্রোফাইল লোড করা যায়নি"
        description="অ্যাকাউন্ট সেবার সঙ্গে সংযোগ করা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।"
        retryHref="/profile"
      />
    );
  }

  if (!session) {
    redirect("/signin?callbackUrl=%2Fprofile");
  }

  return <ProfileCard user={session.user} />;
}
