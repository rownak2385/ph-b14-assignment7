import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignInForm } from "@/components/auth/signin-form";

export const metadata: Metadata = {
  title: "সাইন ইন",
  description: "বাজার দর অ্যাকাউন্টে নিরাপদে সাইন ইন করুন।",
};

export default function SignInPage() {
  return (
    <AuthPageShell
      eyebrow="আবার স্বাগতম"
      title="আপনার অ্যাকাউন্টে সাইন ইন করুন"
      description="ইমেইল ও পাসওয়ার্ড অথবা আপনার পছন্দের সামাজিক অ্যাকাউন্ট ব্যবহার করুন।"
    >
      <SignInForm />
    </AuthPageShell>
  );
}
