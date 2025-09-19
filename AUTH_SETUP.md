Implementation: Google login with NextAuth (App Router)

Steps
- Install deps: pnpm add next-auth
- Create Google OAuth Client: https://console.cloud.google.com/apis/credentials with type Web application. Add Authorized redirect URI: http://localhost:3000/api/auth/callback/google
- Set env vars in .env:
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=replace-with-random-string
  GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
  GOOGLE_CLIENT_SECRET=your-client-secret
- Run dev: pnpm dev

Files
- src/auth.config.ts: NextAuth config with Google provider
- src/auth.ts: Exports handlers/auth/signIn/signOut
- src/app/api/auth/[...nextauth]/route.ts: Route binding to NextAuth handlers
- src/app/layout.tsx: Ensures auth initialized on server
- src/app/page.tsx: UI to sign in/out and show user info

Extra Notes
- Generate NEXTAUTH_SECRET: `node -e "console.log(crypto.randomUUID())"`
- If running behind a different host, update NEXTAUTH_URL and Google redirect URI accordingly.
- After sign-in, basic user info (name/email/image) is displayed.

Validation
- Start app with `pnpm dev`. Navigate to /. Click "Sign in with Google" and complete consent. Page shows your profile and a Sign out button. No runtime errors should appear in terminal or browser console.

