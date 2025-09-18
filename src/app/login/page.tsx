"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Welcome</h1>
        <p>Sign in to join the chat</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/chat" })}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}

