import Posts from "../models/postsSchema.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = new Posts(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletePost = await Posts.findByIdAndDelete(req.params.id);

    if (!deletePost) return res.status(404).json({ message: "Post Not Found" });

    res.status(200).json({ message: "The post has been deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};