import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
  content: { type: String, required: true, maxLength: 3600 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Comments", commentSchema);