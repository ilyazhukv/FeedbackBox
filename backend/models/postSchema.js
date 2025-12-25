import mongoose from "mongoose";
import { POST_TYPE, POST_STATUS } from "../config/constants.js";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 120 },
  description: { type: String, required: false, maxLength: 1200 },
  type: {type: String, enum: POST_TYPE.map(el => {el.value}), required: true},
  status: {type: String, enum: POST_STATUS.map(el => {el.value}), default: "new"},
  commentCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Posts", postSchema);