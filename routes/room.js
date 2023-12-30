
import { getRoomNumber } from "../controllers/calculation.js";
import {
  displayRooms,
  getRoomById,
  deleteRoom,
  editRoom,
  addRoom,
  displayRoomsByHotel,
  getRoomsByUserId,
  displayRoomByOrder,
  searchRooms
} from "../controllers/room.js";

import express from "express";
const roomRoute = express.Router();
//uploadImage.single("image"),
//add Room(dashboard)
roomRoute.post("/",  addRoom); //with auth

//get all rooms available
roomRoute.get("/", displayRooms);

roomRoute.post("/order", displayRoomByOrder);

roomRoute.post("/search", searchRooms);

//get room by id (for dashboard and room services)
roomRoute.post("/singleRoom", getRoomById);

//Remove Room(dashboard)
roomRoute.delete("/", deleteRoom); //with auth

//edit Room(dashboard)
roomRoute.patch("/", editRoom); //with auth

// get rooms for a specific hotel
roomRoute.post("/byHotel", displayRoomsByHotel);

// get room number for specific hotel 
roomRoute.post('/number' , getRoomNumber)

//get room by user id 
roomRoute.post('/user',getRoomsByUserId )

export default roomRoute;
