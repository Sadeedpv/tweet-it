'use client'

import InputField from './components/InputField';
import Posts from './components/Posts';
import './globals.css'
import axios from "axios"
import { useEffect, useState } from 'react';


export default function Home() {

  const [posts, setPosts] = useState([]);

  const fetchData = async () =>{
    try{
      const response = await axios.get('/api/getPosts');
      setPosts(response.data.posts);
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() =>{
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000); // Revalidate data every 10 seconds

    return () => {
      clearInterval(intervalId);
    };


  },[])

  return (

    <main className='w-full'>
      <InputField />
      {posts.map((post:any) =>{
        return <Posts key={post.id} posts={post} />
      })}
    </main>
  )
}
