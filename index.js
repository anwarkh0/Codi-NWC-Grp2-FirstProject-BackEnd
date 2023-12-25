import express from "express";
import sequelize from "./config/dbConnection.js";
import dotenv from "dotenv";
import ratingRoute from "./routes/rating.js"
import userRoute from "./routes/user.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/AuthRouter.js"
import db from "./models/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const staticDirectory = "./images";
app.use("/images", express.static(staticDirectory));

//middlewares
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))
app.use(express.json());
// app.use("/room", roomRoute);
// app.use("/user", userRoute);
// app.use("/hotel", hotelRoute);
// app.use("/booking", bookingRoute);
app.use('/rating', ratingRoute)
app.use('/user', userRoute)
app.use('/auth', AuthRoutes)

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Failed to synchronize database: ", error);
  });

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
