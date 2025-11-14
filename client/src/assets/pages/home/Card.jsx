import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Card.css";

const Card = ({ post, refreshPosts, serverUrl }) => {
  const navigate = useNavigate();

  const deletePost = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await axios.delete(`${serverUrl}/deletepost/${post._id}`);
      refreshPosts();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete");
    }
  };

  const editPost = () => {
    navigate(`/updatepost/${post._id}`);
  };

  return (
    <div className="Card">
      <h3 className="card-topic">{post.topic}</h3>
      <div className="card-content">
        <p><strong>Question:</strong> {post.question}</p>
        <p><strong>Answer:</strong> {post.answer}</p>
      </div>
      <div className="card-buttons">
        <button className="card-btn card-btn-edit" onClick={editPost}>
          Edit
        </button>
        <button className="card-btn card-btn-delete" onClick={deletePost}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
