import express from "express";
import {
  getAllHotels,
  createHotel,
  getHotelById,
  updateHotel,
  deleteHotel,
  getHotelsByUserId,
  getHotelByName
} from "../controllers/hotel.js";
// // import { verifyAdmin } from "../middleware/verifyToken.js";

const hotelRouter = express.Router();

hotelRouter.post("/", createHotel);
hotelRouter.post("/byName", getHotelByName);
hotelRouter.patch("/", updateHotel);
hotelRouter.delete("/", deleteHotel);
hotelRouter.get("/", getAllHotels);
hotelRouter.post("/id", getHotelById);
hotelRouter.post('/user', getHotelsByUserId)

export default hotelRouter;
