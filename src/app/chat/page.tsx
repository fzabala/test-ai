import { auth } from "@/auth";
import Link from "next/link";
import { SignOutButton } from "@/components/AuthButtons";

export default async function ChatPage() {
  const session = await auth();
  const user = session?.user;
  return (
    <main style={{ padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <h1>Global Chat</h1>
          {user ? (
            <p>Signed in as {user.name ?? user.email}</p>
          ) : (
            <p>
              You are not signed in. <Link href="/">Go home</Link>
            </p>
          )}
        </div>
        <SignOutButton />
      </header>
      <p>This is a placeholder for the global chat room.</p>
    </main>
  );
}

