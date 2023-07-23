'use client';
import AddComment from '@/app/components/AddComment';
import SinglePost from '@/app/components/singlePost';
import Comment from '@/app/components/Comment';
import { baseUrl } from '@/constants/baseUrl';
import { toast } from 'react-hot-toast';
import ReactLoading from 'react-loading';
import useSWR from 'swr';

type Props = {
    params: {
        id: string
    }
}

const fetcher = async (url:string) =>{
    const response = await fetch(url,{cache:'no-store'});
    const data = await response.json();
    return data.post;
  }
  
export default ({params}:Props) => {

    const { data: post, error } = useSWR(`${baseUrl}/api/getPosts?id=${params.id}`, fetcher, {
        refreshInterval:1000
      });
    if (error){
        toast.error("Error loading post")!
    }
    if (!post) {
        // Handle loading state
        return <div className='flex items-center justify-center flex-col h-[400px] w-full'>
          <ReactLoading type='cylon' height={65} width={65} />
        </div>;
      }

    return (
        <div className='w-full'>
            <SinglePost post={post} />
            <AddComment id={Number(params.id)}/>
            {post?.comments.map((comment:any, index:number)=>{
              return <Comment key={index} comment={comment}/>
            })}
        </div>
    )
}