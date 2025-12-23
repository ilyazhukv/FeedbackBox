import Comments from "../models/commentSchema.js";
import Post from "../models/postSchema.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comments.find({ postId: req.params.id }).populate("postId").sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const newComment = new Comments({
      postId: req.params.id,
      content: req.body.content
    });
    await newComment.save();
    await Post.findByIdAndUpdate(req.params.id, { $inc: { commentCount: 1 } })
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const resComment = await Comments.findByIdAndDelete(req.params.id);

    if (!resComment) return res.status(404).json({ message: "Comment Not Found" });

    await Post.findByIdAndUpdate(resComment.postId, { $inc: { commentCount: -1 } });
    res.status(200).json({ message: "The comment has been deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};