"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function Home() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        const data = await res.json();
        setUser(data?.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  const signIn = () => {
    window.location.href = "/api/auth/signin/google";
  };

  const signOut = () => {
    window.location.href = "/api/auth/signout";
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Google Authentication Demo</h1>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div>
            <p>Signed in as: {user.name ?? user.email}</p>
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} width={64} height={64} alt="avatar" style={{ borderRadius: 8 }} />
            ) : null}
            <button className={styles.primary} onClick={signOut} style={{ marginTop: 16 }}>
              Sign out
            </button>
          </div>
        ) : (
          <button className={styles.primary} onClick={signIn}>Sign in with Google</button>
        )}
      </main>
    </div>
  );
}
