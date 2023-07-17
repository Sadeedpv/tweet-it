'use client';

import axios from "axios";
import {  useEffect, useLayoutEffect, useState } from "react";
import {useSession} from 'next-auth/react';
import toast from 'react-hot-toast';



export default () => {
    const [post, setPost] = useState('');
    const [disabled, setDisabled] = useState(true);
    const {data:session} = useSession();

    // handle submit function
    const handleSubmit =  async (e:React.FormEvent) =>{
        e.preventDefault();
        setPost('');
        setDisabled(true);
        toast('Posting..')
        await axios.post("/api/posts", {
            title:post,
            email:session?.user?.email,

          }).then(() =>{
            setDisabled(false);
            toast.success('Successfully posted')
          }).catch((err) =>{
            // toast.error(err)
            toast.error(err.response.data.error)
          })
    }

    useEffect(() =>{
        if (session){
            setDisabled(false)
        }

    },[session])

    return (
        <form className="bg-white my-8 py-8 rounded-md flex items-center justify-center "
        onSubmit={handleSubmit}
        >
            <div className="flex flex-col my-4 flex-1 mx-14  md:mx-24">
                <textarea 
                className={`p-4  text-lg rounded-md my-1  bg-gray-200  ${post.length > 300? 'text-red-700' :'text-black'}`}
                placeholder="What's on your mind?"
                rows={4}
                cols={38}
                value={post}
                onChange={(e) =>{
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