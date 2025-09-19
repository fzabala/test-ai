Implementation notes for Global Chat with Google Auth + Sendbird

Overview
- Adds NextAuth with Google provider.
- Protects `/chat` route; unauthenticated users see Google Sign In.
- Adds `ChatClient` placeholder where Sendbird UIKit should mount.

Files
- src/auth/config.ts: NextAuth configuration with Google.
- src/auth/index.ts: Exports `handlers`, `auth`, `signIn`, `signOut`.
- src/app/api/auth/[...nextauth]/route.ts: NextAuth route handlers.
- src/app/chat/page.tsx: Protected chat page with Sign In/Out.
- src/components/ChatClient.tsx: Mount point for Sendbird chat.

Env Vars
- GOOGLE_CLIENT_ID=
- GOOGLE_CLIENT_SECRET=
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=generate_a_long_random_string
- NEXT_PUBLIC_SENDBIRD_APP_ID=
- NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL=

Google OAuth Setup
1) Go to Google Cloud Console → OAuth consent and Credentials.
2) Create OAuth Client ID (Web application).
3) Authorized redirect URI: http://localhost:3000/api/auth/callback/google
4) Put Client ID/Secret into `.env` as above.

Sendbird Setup
1) Create a Sendbird application; copy Application ID into NEXT_PUBLIC_SENDBIRD_APP_ID.
2) Create or locate a Group Channel; copy channel URL into NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL.
3) Choose an SDK integration:
   A) UIKit React: install `@sendbird/uikit-react` and follow docs to render the GroupChannel component in `ChatClient`.
   B) UIKit Web (CDN): include script tag in `src/app/layout.tsx` and mount to `#sendbird-chat`.

Example (UIKit Web via CDN)
Add before body close in `src/app/layout.tsx`:

  {/* <script src="https://unpkg.com/@sendbird/uikit-web/dist/SendbirdUIKit.min.js"></script> */}

Then in `src/components/ChatClient.tsx`, mount after ensuring `window.SendbirdChat` exists. Pseudocode:

  useEffect(() => {
    if (!window.SendbirdChat || !appId || !channelUrl) return;
    const sb = new window.SendbirdChat({ appId });
    window.sb = sb;
    sb.connect("anonymous_" + Date.now()).then(() => {
      sb.loadGroupChannel(channelUrl).then((channel: any) => {
        channel.render({ container: document.getElementById('sendbird-chat') });
      });
    });
  }, [appId, channelUrl]);

Security Notes
- Do not hardcode secrets; use environment variables.
- Session strategy is JWT; adjust as needed.

Run locally
- pnpm dev
- Visit /chat → Sign in with Google → chat renders.

Testing
- Ensure env vars are present. Without Sendbird SDK, the page renders but no chat UI mounts (expected). Integrate one of the SDK options above for full chat UI.

