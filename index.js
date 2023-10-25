import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import roomRoute from "./routes/room.js";
import userRoute from './routes/user.js';
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 8000;

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/room", roomRoute);
app.use("/user", userRoute);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

app.listen(port, () => {
  connect();
  console.log(`server is listening on port ${port}`);
});
