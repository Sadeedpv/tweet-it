import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../prisma/client";


const adapter = PrismaAdapter(prisma);


export const authOptions = {
    // Configure one or more authentication providers
    adapter: adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
          })
      // You can add more providers here
    ],
  
    // Use Prisma adapter for database integration
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};