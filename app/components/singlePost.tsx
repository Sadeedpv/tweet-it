'use client';

import Image from 'next/image';


interface Post{
    id:string,
    title:string,
    userId:string,
    likes:{
        id:string,
        userId:string,
        postId:string
    }[],
    comments:{
        id:string,
        text:string,
        userId:string,
        postId:string,
    }[],
    user?:{
        id:string,
        name:string,
        image:string,
        email:string
    }
}


export default ({post}:{post:Post}) => {
    console.log(post)
    return (
        <div className="flex flex-col bg-white my-8 py-8 rounded-md justify-center pl-2 lg:pl-6">
            <div className="flex gap-5 items-center">
                <Image src={post?.user?.image || ''} alt="GitHub user profile"
                    height={64} width={64} priority
                    className="w-12 rounded-full ml-3 cursor-pointer"
                />
            <p className="font-bold text-lg">{post?.user?.name}</p>
            </div>
            <div className=' text-left py-5 text-xl break-words p-4'>
                {post.title}
            </div>
            <div className="flex gap-5 items-center pl-4">
                <p className='font-bold text-slate-700'>{post.comments.length} Comments</p>
                <p className='font-bold text-slate-700'>{post.likes?.length} {post.likes.length > 1?'Likes':'Like'}</p>
            </div>
        </div>
    )
}