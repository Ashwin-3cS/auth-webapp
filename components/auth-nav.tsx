"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function AuthNav() {
  const pathname = usePathname();

  const navItemClass = (isActive: boolean) =>
    cn(
      "rounded-md px-4 py-2 text-sm font-medium transition-colors",
      isActive
        ? "bg-violet-600 text-white hover:bg-violet-700"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
    );

  return (
    <div className="flex items-center gap-2">
      <Link href="/auth/login" className={navItemClass(pathname === "/auth/login")}>
        Log in
      </Link>
      <Link href="/auth/sign-up" className={navItemClass(pathname === "/auth/sign-up")}>
        Sign up
      </Link>
    </div>
  );
}
