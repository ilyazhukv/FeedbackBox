import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/adminSchema.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.URI);

  await Admin.findByIdAndDelete('');

  await mongoose.disconnect();
  process.exit();
}

run();