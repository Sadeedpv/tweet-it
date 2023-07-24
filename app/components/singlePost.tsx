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
        <div className="upperContainer">
            <div className="innerContainer gap-3">
                <Image src={post?.user?.image || ''} alt="GitHub user profile"
                    height={64} width={64}
                    className="image"
                />
            <p className="title text-lg">{post?.user?.name}</p>
            </div>
            <div className='content text-xl'>
                {post.title}
            </div>
            <div className="bottomContainer">
                <p className='subText'>{post.comments.length} {post.comments.length > 1?'Comments':'Comment'}</p>
                <p className='subText'>{post.likes?.length} {post.likes.length > 1?'Likes':'Like'}</p>
            </div>
        </div>
    )
}