import { LogoutButton } from "@/components/logout-button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Suspense } from "react";

async function WelcomeUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims.email;

  return <span className="text-slate-600">Welcome, {email ?? "there"}</span>;
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-svh bg-white text-slate-900">
      <div className="flex min-h-svh w-full flex-col">
        <nav className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-6 py-4 text-sm">
            <Link href="/protected" className="text-base font-semibold tracking-tight">
              Auth webapp
            </Link>
            <div className="flex items-center gap-4">
              <Suspense fallback={<span className="text-slate-600">Welcome</span>}>
                <WelcomeUser />
              </Suspense>
              <LogoutButton />
            </div>
          </div>
        </nav>
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10">
          {children}
        </div>
      </div>
    </main>
  );
}
