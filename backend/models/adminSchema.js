import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 }
});

export default mongoose.model("Admin", adminSchema);