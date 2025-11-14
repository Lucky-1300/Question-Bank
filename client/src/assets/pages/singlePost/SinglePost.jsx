import './SinglePost.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const url = import.meta.env.VITE_SERVER_URL;
console.log("SERVER URL IS:", url);


const SinglePost = () => {
    const [post, setPost] = useState({});
    const { postID } = useParams();
    const navigate = useNavigate();
    const url = import.meta.env.VITE_SERVER_URL;

    const samplePost = {
        topic: "Artificial Intelligence in Education",
        question: "How can AI be used to personalize learning experiences for students?",
        answer: `Artificial Intelligence (AI) can revolutionize education by tailoring learning experiences to individual student needs. 
        AI-driven systems can analyze student performance data, identify areas of weakness, and suggest personalized study plans. 
        For example, adaptive learning platforms like Coursera and Khan Academy use AI algorithms to recommend lessons and exercises 
        based on each student’s pace and comprehension. Additionally, AI chatbots can act as virtual tutors, providing instant feedback 
        and answering questions around the clock. This ensures that students receive continuous, customized support — making education 
        more engaging, effective, and inclusive for all learners.`
    };

    const loadPosts = async () => {
        try {
            const response = await axios.get(`${url}/getsinglepost/${postID}`);

            if (response?.data?.responseData) {
                setPost(response.data.responseData);
            } else {
                setPost(samplePost);
            }
        } catch (error) {
            console.error(error);
            setPost(samplePost);
        }
    };

    useEffect(() => {
        loadPosts();
    }, [postID]);

    const deletePost = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.delete(`${url}/deletepost/${postID}`);

    console.log("DELETE RESPONSE:", res.data);

    if (res.data.responseData) {
      navigate("/");
    }
  } catch (error) {
    console.error("DELETE ERROR:", error);
    alert("Delete failed!");
  }
};




    return (
        <div className='Single-Post'>
            <h1 className='topic'>{post?.topic}</h1>
            <h2 className='question'>{post?.question}</h2>
            <p className='answer'>{post?.answer}</p>

            <div className='btns'>
                <button onClick={deletePost} className='btn btn-delete'>Delete</button>
                <button onClick={() => navigate(`/updatepost/${postID}`)} className='btn btn-update'>Update</button>
            </div>
        </div>
    );
};

export default SinglePost;


