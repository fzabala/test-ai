import Image from "next/image";
import styles from "./page.module.css";
import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {!session ? (
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button className={styles.primary} type="submit">
              Sign in with Google
            </button>
          </form>
        ) : (
          <div className={styles.ctas}>
            <div className={styles.secondary}>
              <strong>Signed in</strong>
              <div>Name: {session.user?.name}</div>
              <div>Email: {session.user?.email}</div>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className={styles.secondary} type="submit">
                Sign out
              </button>
            </form>
          </div>
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
