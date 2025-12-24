import { POST_TYPE, POST_STATUS } from "../config/post.constants.js";

export const getPostMetaType = (req, res) => {
  try {
    res.status(200).json(POST_TYPE);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPostMetaStatus = (req, res) => {
  try {
    res.status(200).json(POST_STATUS);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}