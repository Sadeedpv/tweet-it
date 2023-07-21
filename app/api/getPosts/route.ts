import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../prisma/client'


export async function GET(request:NextRequest){
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
        // Disable caching for this API route
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
    }catch(error){
        return NextResponse.json(error, {status:500});
    }
}