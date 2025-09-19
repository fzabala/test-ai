export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/protected"], // Adjust to protect routes if needed
};

