# Chat Room with Google Auth and Sendbird (MVP)

This implementation adds Google authentication via NextAuth and a minimal global chat page powered by Sendbird client APIs, suitable for local development.

## Overview

- Google sign-in protects the chat route (`/chat`).
- Uses `NEXT_PUBLIC_SENDBIRD_APP_ID` and `NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL` from `.env`.
- Minimal client logic without Sendbird UI Kit.

## Files Added

- `src/auth/config.ts` – NextAuth configuration with Google provider.
- `src/auth/index.ts` – Convenience re-exports for `auth`, `signIn`, `signOut`.
- `src/app/api/auth/[...nextauth]/route.ts` – App Router NextAuth handler.
- `src/middleware.ts` – Auth middleware protecting `/chat`.
- `src/app/login/page.tsx` – Sign-in UI.
- `src/app/chat/page.tsx` – Minimal chat client page.

## Dependencies

- Add: `next-auth: x.y.z`

Install packages:

```
pnpm add next-auth
```

## Environment Variables

Ensure `.env` has the following:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

NEXT_PUBLIC_SENDBIRD_APP_ID=your-app-id
NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL=your-group-channel-url
```

Notes:
- Generate `NEXTAUTH_SECRET` using a random string generator.
- `NEXTAUTH_URL` should match your local dev URL.

## Google OAuth Setup

1. Go to Google Cloud Console → Credentials.
2. Create OAuth 2.0 Client ID (Web application).
3. Authorized JavaScript origins: `http://localhost:3000`.
4. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`.
5. Copy `Client ID` and `Client Secret` into `.env` as shown above.

## Usage

1. Install dependencies: `pnpm install`.
2. Start dev server: `pnpm dev`.
3. Visit `/login`, sign in with Google.
4. You will be redirected to `/chat`.

## Notes on Sendbird Client

This MVP uses a simplified WebSocket interaction without the UI Kit. For production-grade apps, prefer the official Sendbird JavaScript SDK and server-side token-based auth. The current client sends basic JSON frames and expects simplified responses suitable for a dev sandbox; adjust as needed for your Sendbird environment.

If your workspace requires a server-side proxy for REST calls or authentication, add logic under `src/app/api/sendbird/proxy/route.ts` and call it from the client.

## Validation Checklist

- `pnpm build` compiles without type/import errors.
- Environment variables are present and non-empty.
- Google OAuth redirect succeeds.
- Visiting `/chat` when unauthenticated triggers middleware to redirect to `/login`.
- Messages appear as you send them in the global channel.

## Testing

If you have Jest configured, consider adding tests to validate auth redirection (middleware matcher) and environment guards. No tests were added here to avoid introducing frameworks.

