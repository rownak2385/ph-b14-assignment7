"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type ProfileEditFormProps = {
  currentName: string;
  email: string;
};

function validateName(value: string) {
  const trimmedName = value.trim();

  if (!trimmedName) {
    return { error: "নাম লিখুন।", name: trimmedName };
  }

  if (trimmedName.length < 2) {
    return { error: "নাম কমপক্ষে ২ অক্ষরের হতে হবে।", name: trimmedName };
  }

  if (trimmedName.length > 80) {
    return { error: "নাম ৮০ অক্ষরের বেশি হতে পারবে না।", name: trimmedName };
  }

  return { error: "", name: trimmedName };
}

export function ProfileEditForm({ currentName, email }: ProfileEditFormProps) {
  const router = useRouter();
  const { refetch } = authClient.useSession();
  const [name, setName] = useState(currentName);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validation = validateName(name);

    if (validation.error) {
      setFormError(validation.error);
      return;
    }

    if (validation.name === currentName.trim()) {
      const unchangedMessage = "নামটি অপরিবর্তিত আছে। নতুন নাম লিখে আবার চেষ্টা করুন।";
      setFormError(unchangedMessage);
      toast.error(unchangedMessage);
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const { error } = await authClient.updateUser({ name: validation.name });

      if (error) {
        throw new Error(error.message || "Profile update failed");
      }

      await refetch();
      toast.success("আপনার নাম সফলভাবে হালনাগাদ হয়েছে।");
      router.replace("/profile");
      router.refresh();
    } catch {
      const message = "নাম হালনাগাদ করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message);
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-slate-50/70 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_-42px_rgba(17,24,39,0.4)]">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-5 py-8 sm:px-10 sm:py-10">
            <p className="text-sm font-semibold tracking-[0.18em] text-emerald-300 uppercase">
              অ্যাকাউন্ট সেটিংস
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              প্রোফাইল সম্পাদনা
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              এখানে আপনার প্রদর্শিত নাম পরিবর্তন করতে পারবেন।
            </p>
          </div>

          <form data-profile-edit-form onSubmit={handleSubmit} noValidate className="space-y-6 p-5 sm:p-10">
            <div>
              <label htmlFor="profile-name" className="text-sm font-semibold text-slate-900">
                পূর্ণ নাম
              </label>
              <input
                id="profile-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={80}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (formError) setFormError("");
                }}
                aria-invalid={Boolean(formError)}
                aria-describedby={formError ? "profile-name-error" : "profile-name-help"}
                disabled={isSubmitting}
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />
              {formError ? (
                <p id="profile-name-error" role="alert" className="mt-2 text-sm font-medium text-red-600">
                  {formError}
                </p>
              ) : (
                <p id="profile-name-help" className="mt-2 text-sm text-slate-500">
                  ২ থেকে ৮০ অক্ষরের মধ্যে একটি নাম লিখুন।
                </p>
              )}
            </div>

            <div>
              <label htmlFor="profile-email" className="text-sm font-semibold text-slate-900">
                ইমেইল ঠিকানা
              </label>
              <input
                id="profile-email"
                type="email"
                value={email}
                readOnly
                aria-describedby="profile-email-help"
                className="mt-2 min-h-12 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600 outline-none"
              />
              <p id="profile-email-help" className="mt-2 text-sm text-slate-500">
                নিরাপত্তার জন্য এই ধাপে ইমেইল পরিবর্তন করা যাবে না।
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/profile"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                বাতিল করুন
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                ) : (
                  <Save aria-hidden="true" className="size-4" />
                )}
                {isSubmitting ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
