# Next.js Global Chat with Google Auth and Sendbird

## Requirements

- Env vars in `.env.local` or `.env`:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `NEXTAUTH_URL=http://localhost:3000`
  - `NEXTAUTH_SECRET` (use `openssl rand -base64 32`)
  - `NEXT_PUBLIC_SENDBIRD_APP_ID`
  - `NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL`

## Install & Run

- `pnpm install`
- `pnpm run dev`
- Open `http://localhost:3000`

## Usage

- Home page shows a link to `/chat` and auth buttons.
- Click "Sign in with Google" to authenticate via NextAuth.
- Visit `/chat` to join the global group channel using Sendbird Client SDK.
- Send messages in the input box; messages stream in realtime.

## Notes

- Auth enforced for `/chat` via `src/middleware.ts`.
- All auth UI uses `signIn`/`signOut` in client components.
- No server actions are used inside client components.

