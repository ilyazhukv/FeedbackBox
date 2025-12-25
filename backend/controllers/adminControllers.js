import { POST_STATUS, POST_TYPE, createOrderMap, groupByAndOrder } from "../config/constants.js";
import Admin from "../models/adminSchema.js";
import Post from "../models/postSchema.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const admin = await Admin.findOne({ name });

    if (!admin) return res.status(400).json({ message: "Name doesn't exist" });

    if (!await bcrypt.compare(password, admin.password)) return res.status(400).json({ message: "Incorrect password" });

    const token = JWT.sign({ adminId: admin._id, name: admin.name }, process.env.JWT_SECRET, { expiresIn: "4h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    let admin = await Admin.findOne({ name });

    if (admin) return res.status(400).json({ message: "Name already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ name, password: hashedPassword });
    await newAdmin.save();

    res.status(200).json({ message: "Account created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await Post.aggregate([
      {
        $facet: {
          "total": [{ $count: "count" }],
          "byType": groupByAndOrder("type", createOrderMap(POST_TYPE)),
          "byStatus": groupByAndOrder("status", createOrderMap(POST_STATUS))
        }
      },
      {
        $project: {
          total: { $ifNull: [{ $arrayElemAt: ["$total.count", 0] }, 0] },
          byType: 1,
          byStatus: 1
        }
      }
    ]);

    res.status(200).json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}