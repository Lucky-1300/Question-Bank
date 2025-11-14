import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_SERVER_URL;

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/getposts`);
      setPosts(res.data.responseData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (posts.length === 0) return <div className="empty">No posts available</div>;

  return (
    <div className="Home">
      {posts.map((post) => (
        <Card 
          key={post._id}
          post={post}
          refreshPosts={loadPosts}
          serverUrl={url}     
        />
      ))}
    </div>
  );
};

export default Home;
