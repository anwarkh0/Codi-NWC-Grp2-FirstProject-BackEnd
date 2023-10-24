// import Room from "../models/Room.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

import {
  displayRooms,
  selectRoom,
  deleteRoom,
  editRoom,
  addRoom,
  displayRoomsByHotel,
} from "../controllers/room.js";

import express from "express";
const router = express.Router();

//add Room(dashboard)
router.post("/:hotelId", verifyAdmin, addRoom); //with auth

//get all rooms available
router.get("/?:sorting", displayRooms);

//get room by id (for dashboard and room services)
router.get("/:id", selectRoom);

//Remove Room(dashboard)
router.delete("/:roomId/:hotelId", verifyAdmin, deleteRoom); //with auth

//edit Room(dashboard)
router.put("/:id", verifyAdmin, editRoom); //with auth

// get rooms for a specific hotel
router.get("/:HotelId", displayRoomsByHotel);

export default router;
