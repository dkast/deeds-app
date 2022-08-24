import { type NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/src/server/db/client"
import { env } from "@/src/env/server.mjs"

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
          familyId: user.familyId
        }
      }
    }
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  pages: {
    signIn: "/app/auth/sign-in"
  },
  secret: env.NEXTAUTH_SECRET
}
