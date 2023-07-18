import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../prisma/client'


export async function GET(request:NextRequest){
    const posts = await prisma.post.findMany({
        include: {
            user: true
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    try{
        // return all the posts
        return NextResponse.json({posts},{status:200})
    }catch(error){
        return NextResponse.json(error, {status:500});
    }
}