"use client";

import { Eye, EyeOff, LoaderCircle, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";

import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { authClient } from "@/lib/auth-client";
import { getSafeCallbackUrl } from "@/lib/safe-callback-url";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpForm({ callbackUrl = "/" }: { callbackUrl?: string }) {
  const router = useRouter();
  const safeCallbackUrl = getSafeCallbackUrl(callbackUrl);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    let message = "";
    if (name.length < 2 || name.length > 80) message = "নাম ২ থেকে ৮০ অক্ষরের মধ্যে লিখুন।";
    else if (!EMAIL_PATTERN.test(email)) message = "একটি সঠিক ইমেইল ঠিকানা লিখুন।";
    else if (password.length < 8 || password.length > 128) message = "পাসওয়ার্ড ৮ থেকে ১২৮ অক্ষরের মধ্যে হতে হবে।";

    if (message) {
      setFormError(message);
      toast.error(message);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await authClient.signUp.email({ name, email, password });

      if (result.error) {
        const errorMessage = result.error.code?.includes("USER_ALREADY_EXISTS")
          ? "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।"
          : "অ্যাকাউন্ট তৈরি করা যায়নি। তথ্য যাচাই করে আবার চেষ্টা করুন।";
        setFormError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      const signOutResult = await authClient.signOut();

      if (signOutResult.error) {
        const errorMessage = "অ্যাকাউন্ট তৈরি হয়েছে, কিন্তু সেশন বন্ধ করা যায়নি। পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।";
        setFormError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
      router.push(safeCallbackUrl === "/" ? "/signin" : `/signin?callbackUrl=${encodeURIComponent(safeCallbackUrl)}`);
      router.refresh();
    } catch {
      const errorMessage = "নিবন্ধন সেবাটি এখন পাওয়া যাচ্ছে না। কিছুক্ষণ পর চেষ্টা করুন।";
      setFormError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-5">
          <div>
            <label htmlFor="signup-name" className="block text-sm font-bold text-slate-800">নাম</label>
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              maxLength={80}
              disabled={isSubmitting}
              aria-describedby={formError ? "signup-error" : undefined}
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 disabled:bg-slate-50"
              placeholder="আপনার নাম"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-bold text-slate-800">ইমেইল</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
              aria-describedby={formError ? "signup-error" : undefined}
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 disabled:bg-slate-50"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-bold text-slate-800">পাসওয়ার্ড</label>
            <div className="relative mt-2">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={128}
                disabled={isSubmitting}
                aria-describedby={`signup-password-help${formError ? " signup-error" : ""}`}
                className="min-h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-12 text-slate-950 outline-none transition-colors focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 disabled:bg-slate-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-1 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
              >
                {showPassword ? <EyeOff aria-hidden="true" size={19} /> : <Eye aria-hidden="true" size={19} />}
              </button>
            </div>
            <p id="signup-password-help" className="mt-2 text-xs leading-5 text-slate-500">কমপক্ষে ৮ অক্ষর ব্যবহার করুন।</p>
          </div>
        </div>

        {formError ? <p id="signup-error" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700" role="alert">{formError}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-900/10 transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" aria-hidden="true" size={19} /> : <UserPlus aria-hidden="true" size={19} />}
          {isSubmitting ? "অ্যাকাউন্ট তৈরি হচ্ছে…" : "সাইন আপ"}
        </button>
      </form>

      <div className="my-7 flex items-center gap-3 text-xs font-bold text-slate-400" aria-hidden="true">
        <span className="h-px flex-1 bg-slate-200" /> অথবা <span className="h-px flex-1 bg-slate-200" />
      </div>

      <SocialAuthButtons disabled={isSubmitting} callbackUrl={safeCallbackUrl} />

      <p className="mt-7 text-center text-sm text-slate-600">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link href={safeCallbackUrl === "/" ? "/signin" : `/signin?callbackUrl=${encodeURIComponent(safeCallbackUrl)}`} className="font-bold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
