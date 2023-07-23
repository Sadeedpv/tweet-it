'use client';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {BsBalloonHeartFill} from "react-icons/bs"
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { mutate } from 'swr';
import { Post } from '@prisma/client';
import Link from 'next/link';
import { Like, Postprops } from '@/constants/types';

// Interface for posts
// type Posts = {
//     id:string,
//     title:string,
//     userId:string,
//     likes:{
//         id:string,
//         userId:string,
//         postId:string
//     }[],
//     comments:{
//         id:string,
//         text:string,
//         userId:string,
//         postId:string,
//     }[],
//     user?:{
//         id:string,
//         name:string,
//         image:string,
//         email:string
//     }
// }

// type Like = {
//     id:string,
//     userId:string,
//     postId:string
// }

const Posts =  ({posts}:{posts:Postprops}) => {
    console.log(posts)
    const {data:session} = useSession();
    const [love, setLove] = useState('text-gray-400');

    // If the user has already liked the post, unlike else like
    useEffect(() =>{
        posts.likes?.map((post:Like)=>{
            if (post['userId'] === session?.user?.id){
                setLove('text-red-600')
                return;
            }
        })
    },[posts])

    // This is a function to addlikes
    const handleLove = async () =>{
        toast('Processing...');
        await axios.post('/api/addLikes',{
            postId:posts.id,
            email:session?.user?.email
        }).then((res) =>{
            console.log(res.data.status);
            mutate('api/addPosts')
            res.data.status === 'liking'? setLove('text-red-600'):setLove('text-gray-400')
        }).catch((err) =>{
            console.log(err)
            toast.error('Oops! Something went wrong. Try logging in')
        })
    }

    return (
        <div className="flex flex-col bg-white my-8 py-8 rounded-md justify-center pl-2 lg:pl-6">
            <div className="flex gap-5 items-center">
            <Image src={posts?.user?.image || ''} alt="GitHub user profile"
                    height={64} width={64} priority
                    className="w-12 rounded-full ml-3 cursor-pointer"
                        />
            <p className="font-bold text-lg">{posts?.user?.name}</p>
            </div>
            <div className=' text-left py-5 text-xl break-words p-4'>
                {posts.title}
            </div>
            <div className="flex gap-5 items-center pl-4">
                <p className='font-bold text-slate-700'><Link href={`/Posts/${posts.id}`}> {posts.comments.length} Comments</Link></p>
                <div className='flex items-center gap-1'><BsBalloonHeartFill 
                size={22} 
                className={`cursor-pointer ${love}`}
                onClick={handleLove}
                /> <p className='font-bold text-slate-700'>{posts.likes?.length} {posts.likes.length > 1?'Likes':'Like'}</p></div>
            </div>

        </div>
    )
}

export default Posts