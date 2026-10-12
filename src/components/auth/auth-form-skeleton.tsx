import { AuthPageShell } from "@/components/auth/auth-page-shell";

export function AuthFormSkeleton({ mode }: { mode: "signin" | "signup" }) {
  const fields = mode === "signup" ? 3 : 2;

  return (
    <AuthPageShell
      eyebrow="অ্যাকাউন্ট"
      title={mode === "signup" ? "অ্যাকাউন্ট তৈরি করুন" : "আবার স্বাগতম"}
      description="আপনার নিরাপদ অ্যাকাউন্ট প্রস্তুত হচ্ছে।"
    >
      <div className="animate-pulse" aria-label="অথেন্টিকেশন ফর্ম লোড হচ্ছে" role="status">
        <div className="space-y-5" aria-hidden="true">
          {Array.from({ length: fields }, (_, index) => (
            <div key={index}>
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="mt-2 h-12 w-full rounded-xl bg-slate-100" />
            </div>
          ))}
          <div className="h-12 w-full rounded-xl bg-emerald-100" />
          <div className="h-px w-full bg-slate-200" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 rounded-xl bg-slate-100" />
            <div className="h-12 rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    </AuthPageShell>
  );
}
