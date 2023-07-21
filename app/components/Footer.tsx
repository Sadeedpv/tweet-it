import Link from "next/link"
import { BsGithub } from "react-icons/bs"

export default () => {
    return (
        <div className="flex items-center flex-row gap-2 justify-center mt-auto p-5">
            {/* Footer text */}
            <p className="text-gray-500 text-md font-normal"> Link to the full project  </p><Link href='https://github.com/Sadeedpv/tweet-it'><BsGithub /></Link>
        </div>
    )
}