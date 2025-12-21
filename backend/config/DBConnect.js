import mongoose from "mongoose";

const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Data Base Conncted");
  } catch (error) {
    console.error("Error: ", error);
    process.exit(1);
  }
}

export default DBConnect;