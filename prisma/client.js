import { PrismaClient } from "@prisma/client"

// const client = globalThis.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== "production") globalThis.prisma = client

// export default client;

export default function getPrismaClient(){
    const client = new PrismaClient();
    return client;
}

