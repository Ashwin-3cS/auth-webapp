import Link from "next/link";

import { AuthNav } from "@/components/auth-nav";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white">
        <nav className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-base font-semibold tracking-tight">
            Auth webapp
          </Link>
          <AuthNav />
        </nav>
      </header>
      {children}
    </div>
  );
}
