import Comments from "../models/commentsSchema.js";

export const getComment = async (req, res) => {
  try {
    const comments = await Comments.find({ postId: req.params.id }).populate("postId");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const newComment = new Comments(req.body);
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deleteComment = await Comments.findByIdAndDelete(req.params.id);

    if (!deleteComment) return res.status(404).json({ message: "Comment Not Found" });

    res.status(200).json({ message: "The comment has been deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};