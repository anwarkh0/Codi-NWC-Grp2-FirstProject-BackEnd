import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({});

export default mongoose.model("User", UserSchema);
