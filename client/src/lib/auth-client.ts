import { createAuthClient } from "better-auth/react";
import { API_BASE_URL } from "./api-config";

// Better Auth Client configuration
// On the client, we use the proxied /backend-api path to avoid CORS issues
// On the server, we use the raw internal URL
const isProd = process.env.NODE_ENV === 'production';
const authBaseURL = typeof window !== "undefined" 
  ? (isProd 
      ? `${API_BASE_URL}/api/auth` 
      : `${window.location.origin}/backend-api/api/auth`)
  : `${API_BASE_URL}/api/auth`;

export const authClient = createAuthClient({
    baseURL: authBaseURL,
});

export const { signIn, signUp, useSession, signOut, verifyEmail } = authClient;
