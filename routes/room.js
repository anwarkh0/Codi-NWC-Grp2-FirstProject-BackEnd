// import Room from "../models/Room.js";

import { displayRooms, selectRoom, deleteRoom, editRoom, addRoom, displayRoomsByHotel } from '../controllers/room.js'


import express from "express"
const router = express.Router()


//get all rooms available
router.get('/', displayRooms)

//get room by id (for dashboard and room services)
router.get('/:id', selectRoom)

//Remove Room(dashboard)
router.delete('/:id', deleteRoom)  //with auth

//edit Room(dashboard)
router.patch('/:id', editRoom)    //with auth

//add Room(dashboard)
router.patch('/:id', addRoom)     //with auth

//get rooms for a specific hotel
router.get('/:id/rooms', displayRoomsByHotel)

export default router;