'use client';

import InputField from './components/InputField';
import Posts from './components/Posts';
import useSWR from 'swr';
import ReactLoading from 'react-loading';
import { ASCII_text } from '@/constants/baseUrl';
import { Postprops } from '@/constants/types';

const fetcher = async (url:string) =>{
  const response = await fetch(url,{cache:'no-store'});
  const data = await response.json();
  return data.posts;
}


export default function Home() {
const { data: posts, error } = useSWR(`/api/addPosts`, fetcher, {
  refreshInterval:1000
});
console.log(ASCII_text)

  if (error) {
    // Handle error state
    return <div>Error occurred: {error.message}</div>;
  }

  if (!posts) {
    // Handle loading state
    return <div className='loading'>
      <ReactLoading type='cylon' height={65} width={65} />
    </div>;
  }

  return (

    <main className='container'>
      <InputField />
      {posts.map((post:Postprops) =>{
        return <Posts key={post.id} posts={post} />
      })}
    </main>
  )
}