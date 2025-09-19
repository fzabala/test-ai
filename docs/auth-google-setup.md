# Google Authentication (NextAuth v5)

This repo implements Google sign-in using NextAuth v5 with the App Router.

## Files added

- `src/auth.ts` — NextAuth config (Google provider, exports `auth`, `signIn`, `signOut`, `handlers`).
- `src/app/api/auth/[...nextauth]/route.ts` — Route handlers for NextAuth (GET/POST).
- `src/app/page.tsx` — UI updated to show a sign-in button and, when authenticated, basic user info and a sign-out button.
- `src/middleware.ts` — Optional auth middleware; update `matcher` to protect routes.

## Dependencies

Install NextAuth v5:

```
pnpm add next-auth
```

Note: This project already uses Next 15 and React 19, which are compatible with NextAuth v5.

## Environment variables

Copy `.env.example` to `.env` and add the following values:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_strong_random_string

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

### Generate `NEXTAUTH_SECRET`

You can use any secure random string (32+ chars). For example, in Node REPL:

```
require('crypto').randomBytes(32).toString('hex')
```

## Google OAuth credentials

1. Go to Google Cloud Console → APIs & Services → Credentials.
2. Create OAuth 2.0 Client ID (type: Web application).
3. Authorized JavaScript origins:
   - `http://localhost:3000`
4. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
5. Copy the generated Client ID and Client Secret into `.env`.

## How it works

- `src/auth.ts` configures Google as the provider and exports helpers:
  - `auth()` to read the current session server-side
  - `signIn()` and `signOut()` as server actions
  - `handlers` used by the API route
- `src/app/page.tsx` calls `auth()` in a Server Component and renders either:
  - a server action form that triggers `signIn('google')`;
  - or, if authenticated, displays `name` and `email` and a sign-out form.

## Running locally

1. Install deps: `pnpm install`
2. Ensure `.env` has all variables described above.
3. Start dev server: `pnpm dev`
4. Visit `http://localhost:3000` and click “Sign in with Google”.

## Basic validation

- Build check: `pnpm build` should pass with valid env values.
- Visit `/api/auth/session` to see the session JSON when signed in.

## Notes

- Update `src/middleware.ts` `matcher` to protect routes (e.g., `["/dashboard"]`).
- If deploying on Vercel, set env vars in the project settings and set `NEXTAUTH_URL` to the deployment URL.

