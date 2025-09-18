import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// NOTE: Replace the placeholder values with real env vars in deployment.
// Expected env vars:
// - GOOGLE_CLIENT_ID
// - GOOGLE_CLIENT_SECRET
// - NEXTAUTH_URL
// - NEXTAUTH_SECRET

export const { handlers } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID_PLACEHOLDER",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET_PLACEHOLDER",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // include sub as user id if available
      if (token && session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
  trustHost: true,
  debug: false,
});

export const { GET, POST } = handlers;

