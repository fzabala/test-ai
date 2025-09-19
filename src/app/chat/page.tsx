"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { getSendbird, getGlobalGroupChannel } from "@/lib/sendbird";
import type { BaseMessage, UserMessageCreateParams } from "@sendbird/chat/message";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<BaseMessage[]>([]);
  const [input, setInput] = useState("");
  const channelRef = useRef<Awaited<ReturnType<typeof getGlobalGroupChannel>> | null>(null);

  const userId = useMemo(() => {
    if (!session?.user?.email && !session?.user?.id) return undefined;
    return (session.user.email || session.user.id) as string;
  }, [session]);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    async function init() {
      if (!userId) return;
      const nickname = session?.user?.name ?? undefined;
      await getSendbird(userId, nickname);
      const channel = await getGlobalGroupChannel();
      channelRef.current = channel;
      const { messages: initial } = await channel.getMessagesByTimestamp(Number.MAX_SAFE_INTEGER, { prevResultSize: 30 });
      setMessages(initial);
      const handler = {
        onMessageReceived: (_channel: any, message: BaseMessage) => {
          setMessages((prev) => [...prev, message]);
        },
      };
      const key = `handler_${Date.now()}`;
      channel.addMessageListener(key, handler as any);
      unsub = () => channel.removeMessageListener(key);
    }
    init();
    return () => {
      if (unsub) unsub();
    };
  }, [userId, session?.user?.name]);

  async function send() {
    const channel = channelRef.current;
    if (!channel) return;
    const text = input.trim();
    if (!text) return;
    const params: UserMessageCreateParams = { message: text };
    const sent = await channel.sendUserMessage(params);
    setMessages((prev) => [...prev, sent]);
    setInput("");
  }

  if (status === "loading") return <div>Loading session…</div>;
  if (!session?.user) return <div>Please sign in to use the chat.</div>;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>Global Chat</h1>
      <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, height: 400, overflow: "auto" }}>
        {messages.map((m) => (
          <div key={m.messageId} style={{ marginBottom: 8 }}>
            {"sender" in m && (
              <strong>{m.sender?.nickname || m.sender?.userId}</strong>
            )}
            <div>{"message" in m ? (m as any).message : "(non-text message)"}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
