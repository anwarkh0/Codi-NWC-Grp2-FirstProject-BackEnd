import uploadImage from "../middleware/multer.js";
import {
    getHotelImage, deleteHotelImage, editHotelImage, addHotelImage, displayImagesByHotel
} from "../controllers/hotelImagesController.js";

import express from "express";
const hotelImageRoute = express.Router();
//add Room(dashboard)
hotelImageRoute.post("/add",uploadImage.single('icon'),  addHotelImage); 

//get all rooms available
hotelImageRoute.post("/get", getHotelImage);

hotelImageRoute.post("/getByhotel", displayImagesByHotel);

//Remove Room(dashboard)
hotelImageRoute.delete("/", deleteHotelImage);

//edit Room(dashboard)
hotelImageRoute.patch("/",uploadImage.single("icon"), editHotelImage); 

export default hotelImageRoute;