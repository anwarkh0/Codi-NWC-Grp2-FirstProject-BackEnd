import uploadImage from "../middleware/multer.js";
import {
    getImage, deleteImage, editImage, addImage, displayImagesByRoom
} from "../controllers/roomImageController.js";

import express from "express";
const hotelImageRoute = express.Router();
//add Room(dashboard)
hotelImageRoute.post("/add",uploadImage.array('images', 4),  addImage); 

//get all rooms available
hotelImageRoute.post("/get", getImage);

hotelImageRoute.post("/getByhotel", displayImagesByRoom);

//Remove Room(dashboard)
hotelImageRoute.delete("/", deleteImage);

//edit Room(dashboard)
hotelImageRoute.patch("/",uploadImage.single("image"), editImage); 

export default hotelImageRoute;