import { NextRequest, NextResponse } from 'next/server';
import prisma from  '../../../prisma/client';

export async function POST(request:NextRequest){
    await prisma.$connect();
    const data = await request.json();
    const postId = data.postId;
    const user = await prisma.user.findUnique({
        where:{
            email: data.email
        }
    });
    const userId = user?.id
    if (!userId){
        return NextResponse.json({error: "User not found"}, {status:404});
    }
    if (!postId){
        return NextResponse.json({error: "Post not found"}, {status:404});
    }
    if (!data.text){
        return NextResponse.json({error:"Text is required"},{status:400});
    }
    if (data.text.length>300){
        return NextResponse.json({error:"Text should not be more than 300 characters"}, {status:400});        
    }
    const comment = await prisma.comments.create({
        data:{
            text: data.text,
            userId:userId,
            postId:postId
        }
    });
    prisma.$disconnect();
    try{
        let response = NextResponse.json({comment}, {status:200});
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
    }catch(err){
        console.log("POST Request Error:", err); // Logging any potential error
        return NextResponse.json(err, {status:500});
    }
}


