import styles from "./page.module.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session) redirect("/chat");
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome</h1>
        <p>
          <Link href="/login">Sign in with Google</Link>
        </p>
      </main>
    </div>
  );
}
