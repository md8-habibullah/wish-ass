import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendVerificationEmail } from "./service/email";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [
        process.env.FRONTEND_APP_URL!, 
        "http://localhost:3000", 
        "https://wish-ass-client.vercel.app", 
        "https://medisync-client.vercel.app"
    ].filter(Boolean),
    baseURL: process.env.BETTER_AUTH_URL,
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "CUSTOMER",
                input: false
            },
            banned: {
                type: "boolean",
                required: false,
                defaultValue: false,
                input: false
            },
            banReason: {
                type: "string",
                required: false,
                input: false
            },
            banExpires: {
                type: "date",
                required: false,
                input: false
            }
        },
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        minPasswordLength: 3,
        requireEmailVerification: false,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            url = `${process.env.FRONTEND_APP_URL}/verify-email?token=${token}`;
            sendVerificationEmail(user.email, url, token);
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            accessType: "offline",
            prompt: "select_account consent",
        },
    },
    plugins: [
        admin()
    ]
});