import { NextResponse } from 'next/server';
import prisma from '../../../prisma/client';

export async function GET(request:Request){
    await prisma.$connect;
    const {searchParams} = new URL(request.url);
    const id = searchParams.get('id');
    const post = await prisma.post.findUnique({
        where:{
            id: Number(id)
        }, include:{
            user: true,
            likes: true,
            comments: {
                include:{
                    user:true
                }
            }
        }
    });

    if (!post || !id){
        return NextResponse.json({error: "Post not found"}, {status: 404});
    }
    prisma.$disconnect;
    try{
        let response = NextResponse.json({post}, {status:200});
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
    }catch(err){
        console.log("GET Request Error:", err); // Logging any potential error
        return NextResponse.json(err, {status:500});
    }

}