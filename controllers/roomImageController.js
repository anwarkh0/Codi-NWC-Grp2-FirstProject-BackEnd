import db from "../models/index.js";
import fs from "fs";
const { RoomImagesModel } = db;

//get room from data base according to the id
const getImage = async (req, res) => {
  let id= req.body.id ;
  try {
    const image = await RoomImagesModel.findByPk(id);
    if (!image) {
      return res.status(401).json({ message: "image not found" });
    }
    res.status(200).json({ data: image });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const displayImagesByRoom = async (req, res) => {
    try {
      const roomId= req.body.roomId;
      const images = await RoomImagesModel.findAll({
        where: { roomId: roomId },
      });
      if (!images || images.length === 0) {
        return res.status(404).json({ message: "No images found for this room" });
      }
      res.status(200).json({ data: images });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

//delete it from data base room and remove id from hotel
const deleteImage = async (req, res) => {
    let { id } = req.body;
    try {
      const image = await RoomImagesModel.findByPk(id);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      fs.unlink(image.icon, (err) => {
        if (err) {
          return res.status(500).json({ error: "Error deleting file" });
        }
      });
      await image.destroy();
      return res.status(200).json({ message: "Image deleted" });
    } catch (error) {
      console.error("Deletion error:", error);
      return res.status(500).json({ error: "Server error during deletion" });
    }
  };
  

//find from data base then apdate
const editImage = async (req, res) => {
  const id = req.body.id ;
  const icon = req.file.path;
  try {
    const image = await RoomImagesModel.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: "image not found" });
    }
    const updatedimage = await image.update(icon);
    if (updatedimage){
      fs.unlink(image.icon, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
    }
    res.status(200).json({ data: updatedimage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addImage = async (req, res) => {
    const icon = req.file.path;
    const roomId = req.body.roomId;
  
    try {
        const newImage = await RoomImagesModel.create({
          roomId,
          icon,
        });
      return res.status(200).json({ message: "Images added" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  

export { getImage, deleteImage, editImage, addImage,displayImagesByRoom };
