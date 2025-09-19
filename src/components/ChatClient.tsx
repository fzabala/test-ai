"use client";

import { useEffect, useMemo, useState } from "react";

type SendbirdChat = any; // Avoid type dependency. Assumes global import.

declare global {
  interface Window {
    SendbirdChat?: SendbirdChat;
    sb?: any;
  }
}

export default function ChatClient() {
  const appId = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID;
  const channelUrl = process.env.NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (!appId || !channelUrl) {
      setError("Missing Sendbird env vars.");
      return;
    }
  }, [appId, channelUrl]);

  // We assume the host app loads Sendbird UIKit Web via <script> in layout.
  // If not available, instruct via docs.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.SendbirdChat) return;
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {error && (
        <p style={{ color: "red" }}>
          {error} Set NEXT_PUBLIC_SENDBIRD_APP_ID and NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL.
        </p>
      )}
      <div id="sendbird-chat" />
      {/* NOTE: For production, integrate Sendbird UIKit React or Web SDK.
         This placeholder div is where the UIKit instance should mount.
         See docs in CHAT_SETUP.md for the script tag and mounting snippet. */}
    </div>
  );
}

