import db from "../models/index.js";
import fs from "fs";
const { HotelImagesModel } = db;

//get room from data base according to the id
const getHotelImage = async (req, res) => {
  try {
    const images = await HotelImagesModel.findAll({
      include: [
        {
          model: db.HotelsModel,
        },
      ],
    });
    if (!images) {
      return res.status(401).json({ message: "image not found" });
    }

    // Fetch hotel data for each image
    const imagesWithHotel = await Promise.all(
      images.map(async (image) => {
        const hotelName = image.Hotel.name;

        image.setDataValue("hotelName", hotelName);
        return image;
      })
    );

    res.status(200).json({ data: imagesWithHotel });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const displayImagesByHotel = async (req, res) => {
  try {
    const hotelId = req.body.hotelId;
    const images = await HotelImagesModel.findAll({
      where: { hotelId: hotelId },
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
const deleteHotelImage = async (req, res) => {
  const id = req.body.id;
  try {
    const image = await HotelImagesModel.findByPk(id);
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
const editHotelImage = async (req, res) => {
  const id = req.body.id;
  const icon = req.file.path;
  try {
    const image = await HotelImagesModel.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: "image not found" });
    }
    if (icon) {
        fs.unlink(image.icon, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      }
    const updatedimage = await image.update({icon : icon});
    res.status(200).json({ data: updatedimage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addHotelImage = async (req, res) => {
  const { hotelId } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const icon = req.file.path;
    const newImage = await HotelImagesModel.create({
      hotelId,
      icon,
    });

    return res.status(200).json({ message: "Images added", data: newImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  getHotelImage,
  deleteHotelImage,
  editHotelImage,
  addHotelImage,
  displayImagesByHotel,
};
