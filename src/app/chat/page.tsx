"use client";
import { useEffect, useMemo, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import Sendbird UIKit to avoid SSR issues
const SendbirdApp = dynamic(() => import("@sendbird/uikit-react/App"), {
  ssr: false,
});

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
    if (status === "authenticated") setReady(true);
  }, [status, router]);

  const userId = useMemo(() => {
    const id = (session?.user as any)?.id || session?.user?.email || "guest";
    // Sendbird requires a stable, unique user ID. Prefer provider subject id.
    return String(id);
  }, [session]);

  const nickname = useMemo(() => session?.user?.name || "Guest", [session]);

  if (!ready) return null;

  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, borderBottom: "1px solid #eee" }}>
        <strong style={{ flex: 1 }}>Group Chat</strong>
        <span>{session?.user?.name}</span>
        <button onClick={() => signOut({ callbackUrl: "/login" })}>Sign out</button>
      </header>
      <div style={{ flex: 1, minHeight: 0 }}>
        {/* Replace these placeholders with real env vars in deployment */}
        <SendbirdApp
          appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || "SENDBIRD_APP_ID_PLACEHOLDER"}
          userId={userId}
          nickname={nickname}
          // Use a common group channel: you can pre-create a public group channel
          // in the Sendbird dashboard, then set its URL via env var below to focus the UI.
          // Without this, the UI will show all available group channels for the user.
          // @ts-ignore - prop exists in UIKit v4
          channelUrl={process.env.NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL || undefined}
        />
      </div>
    </div>
  );
}

