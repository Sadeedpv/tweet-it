
import { Commentprops } from "@/constants/types"
import Image from "next/image"

export default ({comment}:{comment:Commentprops}) => {
    console.log('comment', comment)
    return (
        <div className="flex flex-col bg-white my-8 py-8 rounded-md justify-center pl-2 lg:pl-6">
            <div className="innerContainer gap-2">
                <Image src={comment?.user?.image || ''} alt="GitHub user profile"
                    height={64} width={64}
                    className="image"
                />
                <p className="title text-md">{comment?.user?.name}</p>
            </div>
            <div className='content text-lg'>
                {comment?.text}
            </div>
        </div>

    )
}