'use client';
import Image from "next/image";
import Link from "next/link";
import { useSession,signIn,signOut } from 'next-auth/react'



export default () => {
  const {data:session, status} = useSession();
  console.log(status)

  if (status === "loading"){
    return;
  }

    return (
        <div className="flex items-center justify-between w-full">
            <h1 className="logo"><Link href='/'>TweetIt&nbsp;.</Link></h1>
            <div className="flex items-center py-5 justify-evenly">
                <button
                className="button bg-teal-600 hover:bg-teal-700" 
                onClick={() => {
                    session? signOut():signIn();
                }}
                >
                    {session? 'Logout':'Login'}

                </button>
                {session?
                    <Image src={session?.user?.image || ''} alt="GitHub user profile"
                    height={64} width={64} className="image"
                        />:<></>
                }

            </div>

        </div>
    )
}