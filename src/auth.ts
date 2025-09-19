// NextAuth v5 configuration for Google provider
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Expose minimal user info in session
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Augment session user type safely without using any
        session.user = {
          ...session.user,
          // token.sub is string | null per NextAuth types
          id: token.sub ?? undefined,
        } as typeof session.user & { id?: string };
      }
      return session;
    },
  },
});
