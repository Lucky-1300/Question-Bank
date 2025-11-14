import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const [heading, setHeading] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { postID } = useParams();
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (!postID) return;
    setLoading(true);
    axios.get(`${url}/getsinglepost/${postID}`)
      .then(res => {
        const post = res.data.responseData;
        if (post) {
          setHeading(post.topic);
          setQuestion(post.question);
          setAnswer(post.answer);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [postID]);

  const submitDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = { topic: heading, question, answer };
      const res = postID
        ? await axios.put(`${url}/updatepost`, { id: postID, ...payload })
        : await axios.post(`${url}/createpost`, payload);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to save post. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h1>{postID ? "Update Post" : "Create New Post"}</h1>

      <form onSubmit={submitDetails} className="create-post__form">
        <div className="create-post__field">
          <label>Heading:</label>
          <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} required />
        </div>

        <div className="create-post__field">
          <label>Question:</label>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>

        <div className="create-post__field">
          <label>Answer:</label>
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} required />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : postID ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
