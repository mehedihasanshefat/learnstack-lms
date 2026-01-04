import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: "https://learnstack-lms.vercel.app",
  plugins: [adminClient()],
});
