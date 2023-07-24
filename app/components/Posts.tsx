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
        <div className="upperContainer">
            <div className="innerContainer gap-3">
            <Image src={posts?.user?.image || ''} alt="GitHub user profile"
                    height={64} width={64} priority
                    className="image"
                        />
            <p className="title text-lg">{posts?.user?.name}</p>
            </div>
            <div className='content text-xl'>
                {posts.title}
            </div>
            <div className="bottomContainer">
                <p className='subText'>
                    <Link href={`/Posts/${posts.id}`}> {posts.comments.length} {posts.comments.length > 1?'Comments':'Comment'}</Link>
                </p>
                <div className='flex items-center gap-1'><BsBalloonHeartFill 
                size={22} 
                className={`cursor-pointer ${love}`}
                onClick={handleLove}
                /> <p className='subText'>{posts.likes?.length} {posts.likes.length > 1?'Likes':'Like'}</p></div>
            </div>

        </div>
    )
}

export default Posts