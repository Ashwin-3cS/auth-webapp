# Auth webapp

A small Next.js authentication app built with Supabase Auth, Tailwind CSS, and shadcn/ui. It supports email/password authentication and Google sign-in, then sends signed-in users to a protected page.

## What is included

- Login and sign-up pages with a shared white and violet UI.
- Email/password sign-up and login through Supabase Auth.
- Google OAuth through Supabase.
- Cookie-based sessions for server-rendered routes.
- A protected route with a welcome message and logout action.
- A proxy that refreshes the Supabase session and redirects unauthenticated visitors away from protected pages.

## How the auth flow works

The form components are client components because they handle user input and call Supabase in the browser. They stay focused on form state and actions.

For Google sign-in, the browser starts the OAuth flow with `signInWithOAuth`. Supabase sends the user to Google, then returns them to `/auth/callback`. The callback route exchanges the returned code for a Supabase cookie session and redirects to `/protected`.

The protected layout reads the signed-in user's email on the server. That request-dependent work sits behind a small `Suspense` boundary, so the navigation can render its fallback while Supabase resolves the session.

## Project structure

```text
app/
  auth/
    callback/route.ts       # Exchanges the OAuth code for a session
    login/page.tsx
    sign-up/page.tsx
    layout.tsx              # Shared auth navigation
  protected/
    layout.tsx              # Authenticated navigation and welcome message
    page.tsx
components/
  login-form.tsx
  sign-up-form.tsx
  logout-button.tsx
lib/supabase/
  client.ts                 # Browser Supabase client
  server.ts                 # Server and route-handler Supabase client
  proxy.ts                  # Session refresh and route protection
proxy.ts                    # Next.js proxy entry point
```

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` with values from the same Supabase project:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
   ```

3. Start the app:

   ```bash
   npm run dev
   ```

## Google OAuth setup

1. In Google Cloud Console, create a **Web application** OAuth client.
2. Add your Supabase callback URL to Google:

   ```text
   https://your-project-ref.supabase.co/auth/v1/callback
   ```

3. In Supabase, enable the Google provider and paste the Google client ID and client secret.
4. In Supabase **Authentication → URL Configuration**, add your local and production callback URLs, for example:

   ```text
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   ```

5. In Vercel, set the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` values used locally, then redeploy.

## Used references for this web-auth flow implementation

- [Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
- [Creating Supabase clients for Next.js](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Google social login with Supabase](https://supabase.com/docs/guides/auth/social-login/auth-google)
