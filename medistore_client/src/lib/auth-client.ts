import { createAuthClient } from "better-auth/react";
import { API_BASE_URL } from "./api-config";

// Fix potential typo from environment variables (e.g., 'ttps://' instead of 'https://')
const cleanApiUrl = API_BASE_URL.replace(/^ttps:\/\//, 'https://');

// Use relative URL if possible on client, or construct absolute
const authBaseURL = typeof window !== "undefined" 
  ? `${window.location.origin}${cleanApiUrl.startsWith('/') ? cleanApiUrl : new URL(cleanApiUrl, window.location.origin).pathname}/api/auth`
  : (cleanApiUrl.startsWith('/') ? `https://medi-server.habibullah.dev/api/auth` : `${cleanApiUrl}/api/auth`);

export const authClient = createAuthClient({
    baseURL: authBaseURL,
});

export const { signIn, signUp, useSession, signOut, verifyEmail } = authClient;
