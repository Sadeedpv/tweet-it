'use client';
import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { baseUrl } from '@/constants/baseUrl';
import { mutate } from 'swr';

type ID = {
    id:number
}

export default ({id}:ID) => {
    const {data:session} = useSession();
    const [input, setInput] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() =>{
        if (session){
            setDisabled(false)
        }
    },[session])

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        setInput('');
        setDisabled(true);
        toast('Posting...');
        await axios.post(`${baseUrl}/api/addComments`,{
            text:input,
            email:session?.user?.email,
            postId:id

        }).then((res) =>{
            setDisabled(false);
            toast.success('Successfully posted');
            console.log(res.data);
            mutate(`${baseUrl}/api/getPosts`);
        }).catch((err)=>{
            setDisabled(false)
            toast.error(err.response.data.error);
        })

    }

    return (
        <div >
            <p className="text-gray-700 text-xl font-bold p-2">Write a Comment 🚀</p>
            <form className='flex flex-col gap-5 ' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add a comment"
                    value={input}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) =>{
                        setInput(e.target.value);
                        if (input.length > 300){
                            setDisabled(true);
                        }
                    }}
                    className={`p-5 rounded-sm lg:w-3/4
                    ${input.length > 300 ?'text-red-700 outline-red-700':'text-black outline-none'}
                    `}

                />
                <p className={`font-bold ${input.length > 300? 'text-red-700':'text-black'}`}>{input.length}/300</p>
                <button 
                className={`cursor-pointer text-base rounded-md px-5 py-2 text-white ${disabled?'bg-slate-500':'bg-teal-600 hover:bg-teal-700'} font-normal lg:w-1/4`}
                type="submit"
                disabled={disabled}>
                    Comment
                </button>
            </form>
        </div>
    )
}