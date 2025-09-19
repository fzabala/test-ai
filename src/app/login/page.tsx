"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
      <button
        onClick={() => signIn("google", { callbackUrl: "/chat" })}
        style={{ padding: "10px 16px", border: "1px solid #999", borderRadius: 8 }}
      >
        Sign in with Google
      </button>
    </div>
  );
}

