import express from "express";
import Comments from "../model/commentsSchema.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const comments = await Comments.find({ postId: req.params.id }).populate("postId");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const newComment = new Comments({postId: req.params.id, content: req.body.content});
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteComment = await Comments.findByIdAndDelete(req.params.id);

    if (!deleteComment) return res.status(404).json({ message: "Comment Not Found" });

    res.status(200).json({ message: "The comment has been deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;