import mongoose from "mongoose";

async function dbConnect(URL) {
  console.log("Mongo Connected!");
  return await mongoose.connect(URL);
}

export default dbConnect;
