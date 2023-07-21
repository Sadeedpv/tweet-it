import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../prisma/client'


export async function GET(request:Request){
    await prisma.$connect()
    .then(() => console.log("Connected to DB"))
    .catch((error:any) => console.log("DB Connection Error: ", error));
    const posts = await prisma.post.findMany({
        include: {
            user: true,
            likes:true
        },
        orderBy:{
            createdAt: 'desc'
        }
    });
    prisma.$disconnect();
    try{
        // return all the posts
        let response = NextResponse.json({posts},{status:200});
        // Disable caching for this API route
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
    }catch(error){
        console.log("GET Request Error:", error); // Logging any potential error
        return NextResponse.json(error, {status:500});
    }
}