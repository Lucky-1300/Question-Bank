import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;
