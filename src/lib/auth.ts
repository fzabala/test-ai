import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID_PLACEHOLDER",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET_PLACEHOLDER",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "REPLACE_WITH_COMPLEX_SECRET",
  session: { strategy: "jwt" },
};

export const auth = () => getServerSession(authOptions);

// Route handlers for App Router
const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;
