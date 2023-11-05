import uploadImage from "../middleware/multer.js";
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
router.post("/:hotelId", uploadImage.single("image"), verifyAdmin, addRoom); //with auth

//get all rooms available
router.get("/:sorting?", displayRooms);

//get room by id (for dashboard and room services)
router.get("/:id", selectRoom);

//Remove Room(dashboard)
router.delete("/:roomId/:hotelId", deleteRoom); //with auth

//edit Room(dashboard)
router.put("/:id", editRoom); //with auth

// get rooms for a specific hotel
router.get("/byHotel/:hotelId", displayRoomsByHotel);

export default router;
