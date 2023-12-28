import uploadImage from "../middleware/multer.js";
import {
    getImage, deleteImage, editImage, addImage, displayImagesByRoom
} from "../controllers/roomImageController.js";

import express from "express";
const roomImageRoute = express.Router();
//add Room(dashboard)
roomImageRoute.post("/add",uploadImage.single('image'),  addImage); 

//get all rooms available
roomImageRoute.post("/get", getImage);

roomImageRoute.post("/getByRoom", displayImagesByRoom);

//Remove Room(dashboard)
roomImageRoute.delete("/", deleteImage);

//edit Room(dashboard)
roomImageRoute.patch("/",uploadImage.single("image"), editImage); 

export default roomImageRoute;