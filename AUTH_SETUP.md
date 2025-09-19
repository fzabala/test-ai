# Google Auth + Global Chat Setup

## Overview
- Implements Google authentication using `next-auth` with the new NextAuth helper (`src/auth.ts`).
- Protects `'/chat'` via middleware so only authenticated users can access it.
- Adds sign-in/sign-out server actions and simple UI on home and chat pages.

## Files Added/Updated
- `src/auth.ts`: NextAuth config with Google provider; exports `auth`, `signIn`, `signOut`, `handlers`.
- `src/app/api/auth/[...nextauth]/route.ts`: NextAuth route handlers for GET/POST.
- `src/middleware.ts`: Protects `'/chat'` route.
- `src/components/AuthButtons.tsx`: Sign in/out buttons using server actions.
- `src/app/chat/page.tsx`: Authenticated global chat placeholder.
- `src/app/page.tsx`: Home with conditional auth UI.
- `package.json`: Adds dependency `next-auth`.

## Environment Variables
Create/update `.env.local` or `.env` with:

AUTH_SECRET=replace-with-random-32-characters
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
NEXTAUTH_URL=http://localhost:3000

Notes:
- Generate `AUTH_SECRET` via `openssl rand -base64 32` or similar.
- `NEXTAUTH_URL` should match your dev/prod URL.

## Google OAuth Setup
1. Go to Google Cloud Console → Credentials → Create OAuth client ID.
2. Application type: Web application.
3. Authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
4. Copy the Client ID and Client Secret into env vars above.

## Usage
- Start dev server: `pnpm dev` or `npm run dev`.
- Open `/` and click “Sign in with Google”.
- After signing in, navigate to `/chat` for the protected global chat page.

## Validation Checklist
- TypeScript compiles: imports use `@/` alias and referenced files exist.
- Runtime:
  - `/api/auth/[...nextauth]` exposes GET/POST from `src/auth.ts`.
  - `middleware` redirects unauthenticated users from `/chat` to the sign-in flow.
  - Home page shows sign-in when logged out; sign-out and chat link when logged in.

## Notes
- This implements authentication and route protection; the chat room page is a placeholder ready for real-time features (e.g., WebSocket/DB) in future tickets.

