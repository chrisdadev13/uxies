import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url()
    ),
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    EMAIL_SERVER: z.string(),
    EMAIL_PORT: z.string(),
    EMAIL_FROM: z.string(),
    EMAIL_PASSWORD: z.string(),
    EMAIL_USER: z.string(),
  },
  client: {},
  runtimeEnv: {
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    EMAIL_SERVER: process.env.EMAIL_SERVER,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USER: process.env.EMAIL_USER,
  },
  skipValidation: !!process.env.CI,
});
