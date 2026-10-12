import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignUpForm } from "@/components/auth/signup-form";
import { getSafeCallbackUrl } from "@/lib/safe-callback-url";

export const metadata: Metadata = {
  title: "সাইন আপ",
  description: "বাজার দরে একটি নতুন নিরাপদ অ্যাকাউন্ট তৈরি করুন।",
};

type SignUpPageProps = {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const callbackUrl = getSafeCallbackUrl((await searchParams).callbackUrl);

  return (
    <AuthPageShell
      eyebrow="নতুন অ্যাকাউন্ট"
      title="বাজার দরে যোগ দিন"
      description="আপনার নাম, ইমেইল ও একটি নিরাপদ পাসওয়ার্ড দিয়ে অ্যাকাউন্ট তৈরি করুন।"
    >
      <SignUpForm callbackUrl={callbackUrl} />
    </AuthPageShell>
  );
}
