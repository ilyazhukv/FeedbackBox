import { POST_TYPE, POST_STATUS } from "../config/constants.js";

export const getPostMeta = (req, res) => {
  try {
    res.status(200).json([POST_TYPE, POST_STATUS]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}