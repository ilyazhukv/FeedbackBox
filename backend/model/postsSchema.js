import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  commentCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Posts", postsSchema);