import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next");
  const next =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/protected";
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      return NextResponse.redirect(
        forwardedHost && process.env.NODE_ENV !== "development"
          ? `https://${forwardedHost}${next}`
          : `${origin}${next}`,
      );
    }
  }
  return NextResponse.redirect(`${origin}/auth/error`);
}
