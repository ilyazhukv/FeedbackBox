import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 120},
  description: { type: String, required: false, maxLength: 1200 },
  commentCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Posts", postsSchema);