import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignUpForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "সাইন আপ",
  description: "বাজার দরে একটি নতুন নিরাপদ অ্যাকাউন্ট তৈরি করুন।",
};

export default function SignUpPage() {
  return (
    <AuthPageShell
      eyebrow="নতুন অ্যাকাউন্ট"
      title="বাজার দরে যোগ দিন"
      description="আপনার নাম, ইমেইল ও একটি নিরাপদ পাসওয়ার্ড দিয়ে অ্যাকাউন্ট তৈরি করুন।"
    >
      <SignUpForm />
    </AuthPageShell>
  );
}
