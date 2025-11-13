import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const url = import.meta.env.VITE_SERVER_URL;

  const loadPosts = async () => {
    try {
      const res = await axios.get(`${url}/getposts`);
      setPosts(res.data.responseData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="Home">
      {posts.map((post) => (
        <Card key={post._id} post={post} refreshPosts={loadPosts} />
      ))}
    </div>
  );
};

export default Home;
