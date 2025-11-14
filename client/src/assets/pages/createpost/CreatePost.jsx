import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const [heading, setHeading] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const { postID } = useParams();

  const url = import.meta.env.VITE_SERVER_URL;

  // Load post when editing
  useEffect(() => {
    if (postID) {
      axios
        .get(`${url}/getsinglepost/${postID}`)
        .then((res) => {
          const post = res.data.responseData;
          if (post) {
            setHeading(post.topic);
            setQuestion(post.question);
            setAnswer(post.answer);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [postID]);

  const submitDetails = async (e) => {
    e.preventDefault();

    try {
      if (!postID) {
        // CREATE
        const res = await axios.post(`${url}/createpost`, {
          topic: heading,
          question,
          answer,
        });
        console.log("Post created:", res.data.responseData);
      } else {
        // UPDATE
        const res = await axios.put(`${url}/updatepost`, {
          id: postID,
          topic: heading,
          question,
          answer,
        });
        console.log("Post updated:", res.data.responseData);
      }

      setHeading("");
      setQuestion("");
      setAnswer("");
      navigate("/");
    } catch (err) {
      console.error("❌ Error saving post:", err);
      alert("Failed to save post");
    }
  };

  return (
    <div className="create-post">
      <h1 className="create-post__title">
        {postID ? "Update Post" : "Create a New Post"}
      </h1>

      <form className="create-post__form" onSubmit={submitDetails}>
        <div className="create-post__field">
          <label>Heading:</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
          />
        </div>

        <div className="create-post__field">
          <label>Question:</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        <div className="create-post__field">
          <label>Answer:</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>

        <button type="submit">{postID ? "Update Post" : "Create Post"}</button>
      </form>
    </div>
  );
};

export default CreatePost;
