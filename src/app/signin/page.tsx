import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignInForm } from "@/components/auth/signin-form";
import { getSafeCallbackUrl } from "@/lib/safe-callback-url";

export const metadata: Metadata = {
  title: "সাইন ইন",
  description: "বাজার দর অ্যাকাউন্টে নিরাপদে সাইন ইন করুন।",
};

type SignInPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
    oauthError?: string | string[];
    error?: string | string[];
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const query = await searchParams;
  const callbackUrl = getSafeCallbackUrl(query.callbackUrl);

  return (
    <AuthPageShell
      eyebrow="আবার স্বাগতম"
      title="আপনার অ্যাকাউন্টে সাইন ইন করুন"
      description="ইমেইল ও পাসওয়ার্ড অথবা আপনার পছন্দের সামাজিক অ্যাকাউন্ট ব্যবহার করুন।"
    >
      <SignInForm
        callbackUrl={callbackUrl}
        hasOAuthError={Boolean(query.oauthError || query.error)}
      />
    </AuthPageShell>
  );
}
