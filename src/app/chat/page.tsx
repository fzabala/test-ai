"use client";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";

type Message = {
  message_id: number | string;
  message: string;
  user?: { user_id: string; nickname?: string };
};

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  const appId = process.env.NEXT_PUBLIC_SENDBIRD_APP_ID;
  const channelUrl = process.env.NEXT_PUBLIC_SENDBIRD_GROUP_CHANNEL_URL;

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!appId || !channelUrl) return;

    const userId = (session?.user?.email || session?.user?.name || "user").replace(/[^a-zA-Z0-9_-]/g, "_");

    // Connect via WebSocket to Sendbird Platform API (MVP for dev only)
    const wsUrl = `wss://api-${appId}.sendbird.com/v3/websocket?app_id=${appId}&user_id=${encodeURIComponent(userId)}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      // Request recent messages in the channel (fallback via REST over WebSocket)
      // Note: This is a simplified MVP; production should use the official SDK.
      ws.send(
        JSON.stringify({
          cmd: "get_messages",
          channel_url: channelUrl,
          limit: 30,
        })
      );
    };
    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (Array.isArray(data?.messages)) {
          setMessages(data.messages);
        } else if (data?.message) {
          setMessages((prev) => [...prev, data]);
        }
      } catch {
        // ignore non-JSON control frames
      }
    };
    ws.onerror = () => {
      // noop for MVP
    };
    ws.onclose = () => {
      wsRef.current = null;
    };

    return () => ws.close();
  }, [status, appId, channelUrl, session]);

  const send = () => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || !input.trim()) return;
    ws.send(
      JSON.stringify({
        cmd: "send_user_message",
        channel_url: channelUrl,
        message: input.trim(),
      })
    );
    setInput("");
  };

  if (status === "loading") return <div>Loading…</div>;
  if (status !== "authenticated") return <div>Unauthorized</div>;

  return (
    <div style={{ maxWidth: 720, margin: "24px auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div>Global Chat</div>
        <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
      </header>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          height: 420,
          overflow: "auto",
          padding: 8,
          marginBottom: 8,
          background: "#fafafa",
        }}
      >
        {messages.map((m) => (
          <div key={String(m.message_id)} style={{ padding: "6px 4px" }}>
            <b>{m.user?.nickname || m.user?.user_id || "user"}:</b> {m.message}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message"
          style={{ flex: 1, padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}

