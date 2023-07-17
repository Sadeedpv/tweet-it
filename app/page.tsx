'use client';

import InputField from './components/InputField';
import Posts from './components/Posts';
import './globals.css';
import useSWR from 'swr';
import ReactLoading from 'react-loading';

const fetcher = async (url:string) =>{
  const response = await fetch(url);
  const data = await response.json();
  return data.posts;
}


export default function Home() {
const { data: posts, error } = useSWR('/api/getPosts', fetcher, {refreshInterval:1000});
console.log(posts)

  if (error) {
    // Handle error state
    return <div>Error occurred: {error.message}</div>;
  }

  if (!posts) {
    // Handle loading state
    return <div className='flex items-center justify-center flex-col h-[400px] w-full'>
      <ReactLoading type='spin' height={45} width={45} />
    </div>;
  }

  return (

    <main className='w-full'>
      <InputField />
      {posts.map((post:any) =>{
        return <Posts key={post.id} posts={post} />
      })}
    </main>
  )
}