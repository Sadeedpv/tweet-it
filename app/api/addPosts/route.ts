// Addposts to prisma backend

import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../prisma/client';

// Function

export async function POST(request:NextRequest) {
    const data = await request.json();
    const title = data.title;
    const user = await prisma.user.findUnique({
        where: {
            email : data.email
        }
    })
    if (!user){
        // return error
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    if (!title){
        // throw error
        return NextResponse.json({error: "Title is required"}, {status: 400})
    }

    if (title.length > 300){
        return NextResponse.json({error:"Title should not be more than 300 characters"}, {status:400});
    }
    const userId = user?.id;

    const post = await prisma.post.create({
        data: {
            title,
            userId
        }
    })
    try{
        let response = NextResponse.json({post},{status:200});
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
    }catch(error){
        return NextResponse.json({error}, {status:500})
    }
}


