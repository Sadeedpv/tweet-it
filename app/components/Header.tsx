'use client';
import Image from "next/image";
import Link from "next/link";
import { useSession,signIn,signOut } from 'next-auth/react'



export default () => {
  const {data:session} = useSession();

    return (
        <div className="
            flex items-center justify-between w-full
        
        ">
            <h1 className="font-extrabold text-xl cursor-pointer"><Link href='/'>TweetIt&nbsp;.</Link></h1>
            <div className="flex items-center py-5 justify-evenly">
                <button
                className="text-base rounded-md bg-teal-600 px-5 py-1 text-white 
                font-normal hover:bg-teal-700
                " 
                onClick={() => {
                    session? signOut():signIn();
                }}
                >
                    {session? 'Logout':'Login'}

                </button>
                {session?
                    <Image src={session?.user?.image || ''} alt="GitHub user profile"
                    height={64} width={64} priority
                    className="w-12 rounded-full ml-3 cursor-pointer"
                        />:<></>
                }

            </div>

        </div>
    )
}