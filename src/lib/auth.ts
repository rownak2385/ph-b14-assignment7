import { betterAuth } from "better-auth";
import { Pool } from "pg";

function requireServerEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const baseURL = requireServerEnv("BETTER_AUTH_URL");
const globalForAuth = globalThis as typeof globalThis & {
  bazarDorAuthPool?: Pool;
};

export const authPool =
  globalForAuth.bazarDorAuthPool ??
  new Pool({
    connectionString: requireServerEnv("DATABASE_URL"),
    max: 5,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForAuth.bazarDorAuthPool = authPool;
}

export const auth = betterAuth({
  appName: "বাজার দর",
  baseURL,
  secret: requireServerEnv("BETTER_AUTH_SECRET"),
  database: authPool,
  trustedOrigins: [baseURL],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  socialProviders: {
    google: {
      clientId: requireServerEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requireServerEnv("GOOGLE_CLIENT_SECRET"),
    },
    github: {
      clientId: requireServerEnv("GITHUB_CLIENT_ID"),
      clientSecret: requireServerEnv("GITHUB_CLIENT_SECRET"),
    },
  },
  account: {
    encryptOAuthTokens: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  advanced: {
    cookiePrefix: "bazardor",
  },
});
