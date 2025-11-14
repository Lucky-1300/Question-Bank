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

// Get a single post by ID (use route param instead of query)
router.get("/getsinglepost/:id", getSinglePost);

// Update a post by ID (send id in body)
router.put("/updatepost", updatePost);

// ✅ Delete a post by ID (use route param instead of body)
router.delete("/deletepost/:id", deletePost);

export default router;
