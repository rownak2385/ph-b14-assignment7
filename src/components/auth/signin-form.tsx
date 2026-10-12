"use client";

import { Eye, EyeOff, LoaderCircle, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { authClient } from "@/lib/auth-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has("oauthError") || params.has("error")) {
      toast.error("সামাজিক লগইন সম্পন্ন হয়নি। আবার চেষ্টা করুন।", { id: "oauth-error" });
      window.history.replaceState({}, "", "/signin");
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (!EMAIL_PATTERN.test(email) || password.length === 0) {
      const message = "সঠিক ইমেইল ও পাসওয়ার্ড লিখুন।";
      setFormError(message);
      toast.error(message);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await authClient.signIn.email({ email, password, rememberMe: true });

      if (result.error) {
        const message = "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।";
        setFormError(message);
        toast.error(message);
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      const message = "সাইন ইন সেবাটি এখন পাওয়া যাচ্ছে না। কিছুক্ষণ পর চেষ্টা করুন।";
      setFormError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-5">
          <div>
            <label htmlFor="signin-email" className="block text-sm font-bold text-slate-800">ইমেইল</label>
            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
              aria-describedby={formError ? "signin-error" : undefined}
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 disabled:bg-slate-50"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label htmlFor="signin-password" className="block text-sm font-bold text-slate-800">পাসওয়ার্ড</label>
            <div className="relative mt-2">
              <input
                id="signin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                disabled={isSubmitting}
                aria-describedby={formError ? "signin-error" : undefined}
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
          </div>
        </div>

        {formError ? <p id="signin-error" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700" role="alert">{formError}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-900/10 transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" aria-hidden="true" size={19} /> : <LogIn aria-hidden="true" size={19} />}
          {isSubmitting ? "সাইন ইন হচ্ছে…" : "সাইন ইন"}
        </button>
      </form>

      <div className="my-7 flex items-center gap-3 text-xs font-bold text-slate-400" aria-hidden="true">
        <span className="h-px flex-1 bg-slate-200" /> অথবা <span className="h-px flex-1 bg-slate-200" />
      </div>

      <SocialAuthButtons disabled={isSubmitting} />

      <p className="mt-7 text-center text-sm text-slate-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-bold text-emerald-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
