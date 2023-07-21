import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../prisma/client";

const adapter = PrismaAdapter(prisma);


const authOptions = {
    // Configure one or more authentication providers
    adapter: adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          })
      // You can add more providers here
    ],
    callbacks: {
      session: async ({ session, token, user }) => {
        if (session?.user) {
          session.user.id = user.id;
        }
        return session;
      },
        
    }
  
    // Use Prisma adapter for database integration
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};