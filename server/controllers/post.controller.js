import Post from "../models/post.model.js";

// Create a post
export const CreatePost = async (req, res) => {
  try {
    const { topic, question, answer } = req.body;
    const newPost = await Post.create({ topic, question, answer });
    res.json({ responseData: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ responseData: posts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get single post
export const getSinglePost = async (req, res) => {
  try {
    const { postID } = req.query;
    const post = await Post.findById(postID);
    res.json({ responseData: post });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const { postID, topic, question, answer } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postID, { topic, question, answer }, { new: true });
    res.json({ responseData: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { postID } = req.body;
    await Post.findByIdAndDelete(postID);
    res.json({ responseData: true });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
