"use client";

import { LogIn, LogOut, UserRound, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

type AuthControlsProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function AuthControls({ mobile = false, onNavigate }: AuthControlsProps) {
  const router = useRouter();
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      await refetch();
      onNavigate?.();
      router.push("/");
      toast.success("সফলভাবে সাইন আউট হয়েছে।");
    } catch {
      toast.error("অ্যাকাউন্ট সেবাটি এখন পাওয়া যাচ্ছে না।");
    } finally {
      setIsSigningOut(false);
    }
  }

  const wrapperClass = mobile
    ? "grid grid-cols-2 gap-3"
    : "hidden items-center gap-3 md:flex";

  if (isPending) {
    return (
      <div className={wrapperClass} data-auth-state="loading" role="status">
        <span className="sr-only">অ্যাকাউন্টের তথ্য লোড হচ্ছে</span>
        <span className="h-11 animate-pulse rounded-xl bg-slate-100 md:w-24" aria-hidden="true" />
        <span className="h-11 animate-pulse rounded-xl bg-emerald-100 md:w-24" aria-hidden="true" />
      </div>
    );
  }

  if (!session) {
    return (
      <nav className={wrapperClass} aria-label={mobile ? "মোবাইল অ্যাকাউন্ট নেভিগেশন" : "অ্যাকাউন্ট নেভিগেশন"} data-auth-state={error ? "unavailable" : "signed-out"}>
        <Link
          href="/signin"
          onClick={onNavigate}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-700 px-4 py-2.5 text-sm font-bold text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          <LogIn aria-hidden="true" size={17} />
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          onClick={onNavigate}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          <UserPlus aria-hidden="true" size={17} />
          সাইন আপ
        </Link>
      </nav>
    );
  }

  const displayName = session.user.name || session.user.email;

  return (
    <nav className={wrapperClass} aria-label={mobile ? "মোবাইল অ্যাকাউন্ট নেভিগেশন" : "অ্যাকাউন্ট নেভিগেশন"} data-auth-state="signed-in">
      <Link
        href="/profile"
        onClick={onNavigate}
        className="inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-900 transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        title={displayName}
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs text-white" aria-hidden="true">
          {displayName.trim().charAt(0).toLocaleUpperCase("bn-BD") || <UserRound size={15} />}
        </span>
        <span className="min-w-0 truncate">{mobile ? "আমার প্রোফাইল" : displayName}</span>
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
      >
        <LogOut aria-hidden="true" size={17} />
        {isSigningOut ? "অপেক্ষা করুন…" : "সাইন আউট"}
      </button>
    </nav>
  );
}
