import { env } from "@/env/server.mjs"
import { prisma } from "@/server/db/client"
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { type NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

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
    // async signIn({ user, profile }) {
    //   if ("image_url" in profile!) {
    //     await prisma.user.update({
    //       where: { id: user.id },
    //       data: {
    //         image: profile.image_url as string
    //       }
    //     })
    //   }
    //   return true
    // }
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
    signIn: "/sign-in",
    newUser: "/new-user"
  },
  secret: env.NEXTAUTH_SECRET
}
