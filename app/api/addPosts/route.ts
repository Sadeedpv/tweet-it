// Addposts to prisma backend

import { NextResponse, NextRequest } from 'next/server';
import prisma from '../../../prisma/client';

// GET Function
export async function GET(){
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

// POST Function

export async function POST(request:NextRequest) {
    await prisma.$connect()
    .then(() => console.log("Connected to DB"))
    .catch((error:any) => console.log("DB Connection Error: ", error));
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
    prisma.$disconnect();
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


