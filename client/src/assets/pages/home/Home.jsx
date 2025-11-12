import './Home.css'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = useState();
  const url = import.meta.env.VITE_SERVER_URL;


  const loadPosts = async () => {
    try {
      const response = await axios.get(`${url}/getposts`);
      setPosts(response.data.responseData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='Home'>
      {
        posts?.map((post) => {
          return <Card key={post._id} post={post} />
        })
      }
    </div>
  )
}

export default Home