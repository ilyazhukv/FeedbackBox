import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import DBConnect from "./config/db.js";
import postsRoutes from "./routes/Posts.routes.js";
import commentsRoutes from "./routes/Comments.routes.js";
import adminRoutes from "./routes/Admin.routes.js";
import metaRoutes from "./routes/Meta.routes.js"

dotenv.config();
DBConnect();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/admin", adminRoutes);
app.use("/meta", metaRoutes)

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});