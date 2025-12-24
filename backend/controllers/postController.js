import Posts from "../models/postSchema.js";
import Comment from "../models/commentSchema.js";

export const getPost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not find" })
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = new Posts({ ...req.body, commentCount: 0, status: "new" });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatePost = await Posts.findByIdAndUpdate(postId, {status: req.body.status}, { new: true });

    if (!updatePost) return res.status(404).json({ message: "Post Not Found" });

    res.status(200).json(updatePost)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletePost = await Posts.findByIdAndDelete(postId);

    if (!deletePost) return res.status(404).json({ message: "Post Not Found" });

    await Comment.deleteMany({ postId: postId })

    res.status(200).json({ message: "The post has been deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};