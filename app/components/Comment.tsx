
import { Commentprops } from "@/constants/types"
import Image from "next/image"

export default ({comment}:{comment:Commentprops}) => {
    console.log('comment', comment)
    return (
        <div className="flex flex-col bg-white my-8 py-8 rounded-md justify-center pl-2 lg:pl-6">
            <div className="flex gap-2 items-center">
                <Image src={comment?.user?.image || ''} alt="GitHub user profile"
                    height={64} width={64}
                    className="w-12 rounded-full ml-3 cursor-pointer"
                />
                <p className="font-bold text-md">{comment?.user?.name}</p>
            </div>
            <div className=' text-left py-4 text-lg break-words p-4'>
                {comment?.text}
            </div>
        </div>

    )
}