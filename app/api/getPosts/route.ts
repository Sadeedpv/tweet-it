import { NextRequest, NextResponse } from 'next/server'
import getPrismaClient from '../../../prisma/client'


export async function GET(request:NextRequest){
    const prisma = getPrismaClient();
    const posts = await prisma.post.findMany({
        include: {
            user: true,
            likes:true
        },
        orderBy:{
            createdAt: 'desc'
        }
    });
    // Disconnect prisma
    await prisma.$disconnect();
    try{
        // return all the posts
        let response = NextResponse.json({posts},{status:200});
        response.headers.set("Cache-Control", "s-maxage=1, stale-while-revalidate")
        return response;
    }catch(error){
        return NextResponse.json(error, {status:500});
    }
}