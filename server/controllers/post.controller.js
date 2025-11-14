import Post from "../models/post.model.js";

// 🟢 Create a new post
export const CreatePost = async (req, res) => {
  try {
    const { topic, question, answer } = req.body;

    if (!topic || !question || !answer) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newPost = new Post({ topic, question, answer });
    await newPost.save();

    res.status(201).json({ responseData: newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟡 Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ responseData: posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔵 Get a single post by ID (using route param)
export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ responseData: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🟠 Update a post by ID (ID in body)
export const updatePost = async (req, res) => {
  try {
    const { id, topic, question, answer } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const updated = await Post.findByIdAndUpdate(
      id,
      { topic, question, answer },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ responseData: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔴 Delete a post by ID (using route param)
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ responseData: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
