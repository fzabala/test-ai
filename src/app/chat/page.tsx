import { auth, signIn, signOut } from "@/auth";
import ChatClient from "@/components/ChatClient";

export default async function ChatPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Global Chat</h1>
        <p>You must sign in with Google.</p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/chat" });
          }}
        >
          <button type="submit">Sign in with Google</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Global Chat</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>{session.user.name ?? session.user.email}</span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </div>
      </header>
      <ChatClient />
    </div>
  );
}

