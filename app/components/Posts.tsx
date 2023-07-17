'use client';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { useState } from 'react';
import {BsBalloonHeartFill} from "react-icons/bs"



const Posts =  ({posts}:any) => {
    const [love, setLove] = useState('text-gray-400');

    return (
        <div className="flex flex-col bg-white my-8 py-8 rounded-md justify-center pl-6">
            <div className="flex gap-5 items-center">
            <Image src={posts?.user?.image || ''} alt="GitHub user profile"
                    height={64} width={64} priority
                    className="w-12 rounded-full ml-3 cursor-pointer"
                        />
            <p className="font-bold text-lg">{posts?.user?.name}</p>
            </div>
            <div className=' text-left py-5 text-xl break-all p-4'>
                {posts.title}
            </div>
            <div className="flex gap-5 items-center pl-4">
                <p className='font-bold text-slate-700'>2 Comments</p>
                <div className='flex items-center gap-1'><BsBalloonHeartFill 
                size={22} 
                className={`cursor-pointer ${love}`}
                onClick={() =>{
                    setLove('text-red-600')
                }}
                /> <p className='font-bold text-slate-700'> Likes</p></div>
            </div>

        </div>
    )
}

export default Posts