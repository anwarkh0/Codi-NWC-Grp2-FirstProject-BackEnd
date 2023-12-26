import db from "../models/index.js";

const { RoomsModel, HotelsModel } = db;
//get all the rooms saved in rooms model
const displayRooms = async (req, res) => {
  try {
    const rooms = await RoomsModel.findAll();

    res.status(200).json({ data: rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get room from data base according to the id
const selectRoom = async (req, res) => {
  let { id } = req.body;
  try {
    const room = await RoomsModel.findByPk(id);
    if (!room) {
      return res.status(401).json({ message: "room not found" });
    }
    res.status(200).json({ data: room });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//delete it from data base room and remove id from hotel
const deleteRoom = async (req, res) => {
  let { id } = req.body;

  try {
    const room = await RoomsModel.findByPk(id);
    if (!room) {
      return res.status(401).json({ error: "Room not found" });
    }
    await room.destroy(); // Delete the room
    res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

//find from data base then apdate
const editRoom = async (req, res) => {
  const { id, ...updatedData } = req.body;
  try {
    const room = await RoomsModel.findByPk(id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    const updatedRoom = await room.update(updatedData);
    res.status(200).json({ data: updatedRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//add room and add id to the hotel
const addRoom = async (req, res) => {
  const {
    number,
    price,
    guestNumber,
    hotelId,
    isBooked,
    quality,
    description,
  } = req.body;
  try {
    const newRoom = await RoomsModel.create({
      number,
      price,
      guestNumber,
      hotelId,
      isBooked,
      quality,
      description,
    });
    res.status(200).json({ message: "Room added successfully", data: newRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const displayRoomsByHotel = async (req, res) => {
  try {
    const hotelId = req.body.id;
    const rooms = await RoomsModel.findAll({
      where: { hotelId: hotelId },
    });
    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found for this hotel" });
    }
    res.status(200).json({ data: rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  displayRooms,
  selectRoom,
  deleteRoom,
  editRoom,
  addRoom,
  displayRoomsByHotel,
};
