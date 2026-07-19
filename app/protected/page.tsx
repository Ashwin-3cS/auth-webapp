import { InfoIcon } from "lucide-react";

export default function ProtectedPage() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <h1 className="text-2xl font-semibold text-slate-950">Welcome back</h1>
      <p className="text-slate-600">
        Your session is active and this page is available only to authenticated users.
      </p>
      <div className="mt-5 flex items-center gap-3 rounded-lg border border-violet-100 bg-violet-50 px-5 py-4 text-sm text-violet-950">
        <InfoIcon size="16" strokeWidth={2} />
        You are signed in and can view this protected page.
      </div>
    </div>
  );
}
