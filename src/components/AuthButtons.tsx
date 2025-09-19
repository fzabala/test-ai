"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (loading) return <button disabled>Loading…</button>;
  if (session?.user) {
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>Signed in as {session.user.name ?? session.user.email}</span>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}

