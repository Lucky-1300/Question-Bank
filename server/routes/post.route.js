// routes/post.route.js
import { Router } from "express";
import { 
  CreatePost, 
  deletePost, 
  getPosts, 
  getSinglePost, 
  updatePost 
} from "../controllers/post.controller.js";

const router = Router();

// Create a new post
router.post("/createpost", CreatePost);

// Get all posts
router.get("/getposts", getPosts);

// Get a single post by ID
router.get("/getsinglepost", getSinglePost);

// Update a post by ID
router.put("/updatepost", updatePost);

// Delete a post by ID
router.delete("/deletepost", deletePost);

export default router;
