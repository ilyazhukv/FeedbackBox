import Admin from "../models/adminSchema.js";
import Post from "../models/postSchema.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const groupByAndOrder = (field, orderMap) => [
  { $group: { _id: `$${field}`, count: { $sum: 1 } } },
  {
    $addFields: {
      order: {
        $switch: {
          branches: Object.entries(orderMap).map(([value, priority]) => ({
            case: { $eq: ["$_id", value] },
            then: priority,
          })),
          default: 99,
        },
      },
    },
  },
  { $sort: { order: 1 } },
];

export const loginAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;

    const admin = await Admin.findOne({ name });

    if (!admin) return res.status(400).json({ message: "Name doesn't exist" });

    if (!await bcrypt.compare(password, admin.password)) return res.status(400).json({ message: "Incorrect password" });

    const token = JWT.sign({ adminId: admin._id, name: admin.name }, process.env.JWT_SECRET, { expiresIn: "1h" });
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
          "byType": groupByAndOrder("type", {
            "complaint": 1,
            "suggestion": 2,
            "feedback": 3,
          }),
          "byStatus": groupByAndOrder("status", {
            "new": 1,
            "in-progress": 2,
            "resolved": 3,
          })
        }
      },
      {
        $project: {
          total: { $ifNull: [{ $arrayElemAt: ["$total.count", 0] }, 0] },
          byType: "$byType",
          byStatus: "$byStatus"
        }
      }
    ]);

    res.status(200).json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}