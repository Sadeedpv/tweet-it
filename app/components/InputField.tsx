'use client';

import axios from "axios";
import {  useEffect, useLayoutEffect, useState } from "react";
import {useSession} from 'next-auth/react';
import toast from 'react-hot-toast';
import {mutate} from 'swr'


export default () => {
    const [post, setPost] = useState('');
    const [disabled, setDisabled] = useState(true);
    const {data:session} = useSession();

    // handle submit function
    const handleSubmit =  async (e:React.FormEvent) =>{
        e.preventDefault();
        setPost('');
        setDisabled(true);
        toast('Posting...');
        await axios.post("/api/addPosts", {
            title:post,
            email:session?.user?.email,

          }).then((res) =>{
            setDisabled(false);
            toast.success('Successfully posted')
            mutate('/api/addPosts');
          }).catch((err) =>{
            setDisabled(false)
            toast.error(err.response.data.error)
          })
    }

    useEffect(() =>{
        if (session){
            setDisabled(false)
        }

    },[session])

    return (
        <form className="bg-white my-4 py-8 rounded-md flex items-center justify-center "
        onSubmit={handleSubmit}
        >
            <div className="flex flex-col mt-4 flex-1 mx-6 lg:mx-14">
                <textarea 
                className={`p-4  text-lg rounded-md my-1  bg-gray-200  ${post.length > 300? 'text-red-700 outline-red-700' :'text-black outline-none'}`}
                placeholder="What's on your mind?"
                value={post}
                onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) =>{
                    setPost(e.target.value)
                    if (post.length > 300){
                        setDisabled(true);
                    }
                }}
                />
                <div className="flex justify-between my-2.5">
                    <p className={`font-bold ${post.length > 300? 'text-red-700':'text-black'}`}>
                        {post.length}/300
                    </p>
                    <button
                    className={`cursor-pointer text-base rounded-md px-5 py-1 text-white ${disabled?'bg-slate-500':'bg-teal-600 hover:bg-teal-700'} font-normal`}
                    type="submit"
                    disabled={disabled}
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </form>
    )
}