// lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // ... your providers here
  ],
  session: {
    strategy: "jwt",
  },
};

// If you are using NextAuth v4, middleware usually uses 'withAuth'
// If you want to keep the 'auth' name for your middleware:
import { getServerSession } from "next-auth";
export const auth = () => getServerSession(authOptions);
