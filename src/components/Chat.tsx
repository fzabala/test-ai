"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { SendBirdProvider, ChannelList, Channel } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";

// Simple Group Channel UI using UIKit. You can also use hooks/components.
// Note: For demo, we create or join a public group channel automatically.

type Props = {
  appId?: string;
  channelUrl?: string;
};

export default function Chat({ appId, channelUrl }: Props) {
  const { data: session, status } = useSession();
  const [activeUrl, setActiveUrl] = useState<string | undefined>(channelUrl);

  const sbAppId = appId || process.env.NEXT_PUBLIC_SENDBIRD_APP_ID || "SENDBIRD_APP_ID_PLACEHOLDER";

  useEffect(() => {
    // We could auto-provision a channel if none is provided; left as note.
    setActiveUrl(channelUrl || process.env.NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL || undefined);
  }, [channelUrl]);

  if (status === "loading") return <div>Loading...</div>;

  if (!session?.user) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h2>Welcome</h2>
        <p>Please sign in with Google to join the chat.</p>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>
    );
  }

  const userId = session.user.email || session.user.name || "anonymous";
  const nickname = session.user.name || userId;
  const profileUrl = session.user.image || undefined;

  return (
    <div style={{ height: "80vh", border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ padding: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>Signed in as {nickname}</div>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      <div style={{ height: "calc(100% - 44px)" }}>
        <SendBirdProvider appId={sbAppId} userId={userId} nickname={nickname} profileUrl={profileUrl}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ width: 320, borderRight: "1px solid #eee" }}>
              <ChannelList />
            </div>
            <div style={{ flex: 1 }}>
              {activeUrl ? (
                <Channel channelUrl={activeUrl} />
              ) : (
                <div style={{ padding: 16 }}>Select or create a channel</div>
              )}
            </div>
          </div>
        </SendBirdProvider>
      </div>
    </div>
  );
}
