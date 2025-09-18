export { auth as middleware } from "next-auth/middleware";

// Protect the chat route; unauthenticated users are redirected by NextAuth
export const config = { matcher: ["/chat"] };

