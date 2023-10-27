import express from "express";
const app = express();
import dotenv from "dotenv";
import roomRoute from "./routes/room.js";
import userRoute from "./routes/user.js";
import hotelRoute from "./routes/hotel.js";
import bookingRoute from "./routes/booking.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./config/dbConnection.js";
import { errorTemplate } from "./utils/error.js";
dotenv.config();

const port = process.env.PORT || 8000;
const staticDirectory = "./images";

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/room", roomRoute);
app.use("/user", userRoute);
app.use("/hotel", hotelRoute);
app.use("booking", bookingRoute);
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
