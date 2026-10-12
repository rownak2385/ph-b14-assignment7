"use client";

import { Code2, Globe2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

type Provider = "google" | "github";

export function SocialAuthButtons({ disabled = false }: { disabled?: boolean }) {
  const [pendingProvider, setPendingProvider] = useState<Provider | null>(null);

  async function signInWithProvider(provider: Provider) {
    setPendingProvider(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        newUserCallbackURL: "/",
        errorCallbackURL: "/signin?oauthError=1",
      });

      if (result.error) {
        toast.error("সামাজিক লগইন শুরু করা যায়নি। আবার চেষ্টা করুন।");
        setPendingProvider(null);
      }
    } catch {
      toast.error("সামাজিক লগইন সেবাটি এখন পাওয়া যাচ্ছে না।");
      setPendingProvider(null);
    }
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        disabled={disabled || pendingProvider !== null}
        onClick={() => signInWithProvider("google")}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      >
        <Globe2 aria-hidden="true" size={19} />
        {pendingProvider === "google" ? "অপেক্ষা করুন…" : "Google দিয়ে চালিয়ে যান"}
      </button>
      <button
        type="button"
        disabled={disabled || pendingProvider !== null}
        onClick={() => signInWithProvider("github")}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      >
        <Code2 aria-hidden="true" size={19} />
        {pendingProvider === "github" ? "অপেক্ষা করুন…" : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
}
