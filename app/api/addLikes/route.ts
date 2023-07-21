// Adding like handler

import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../prisma/client'

export async function POST(req:NextRequest) {
    // Check if there is a user logged-in
    // Add like
    const data = await req.json();
    const user = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    })
    // If no user, return error
    if (!user){
        return NextResponse.json({error: "User not found"}, {status: 404})
    }
    const userId = user.id;
    const postId = data.postId
    const heart = await prisma.likes.findFirst({
        where:{
            userId:userId,
            postId:postId
        }
    })
    try{
        if (heart){
            // if there is already a like, remove that like
            const deleteHeart = await prisma.likes.delete({
                where:{
                    id:heart.id
                }
            })
            // Disconnect prisma
            await prisma.$disconnect();
            return NextResponse.json({deleteHeart, status:'unLiking'},{status:200})
        }else{
            const addHeart = await prisma.likes.create({
                data:{
                    userId:userId,
                    postId:postId
                }
            })
            let response = NextResponse.json({addHeart, status:'liking'}, {status:200});
            response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
            response.headers.set('Pragma', 'no-cache');
            response.headers.set('Expires', '0');
            return response;
        }

    }catch(err){
        return NextResponse.json({error:'Something went wrong!'},{status:500})
    }
}