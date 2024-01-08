import db from "../models/index.js";
import { Op } from "sequelize";
const { RoomsModel, ReservationModel, RoomImagesModel, HotelsModel } = db;
//get all the rooms saved in rooms model
const displayRooms = async (req, res) => {
  try {
    const rooms = await RoomsModel.findAll({
      include: [
        {
          model: ReservationModel,
        },
        {
          model: HotelsModel,
        },
        {
          model : RoomImagesModel
        }
      ],
    });

    const roomWithHotel = await Promise.all(
      rooms.map(async (room) => {
        const hotel = room.Hotel ? room.Hotel.name : ""
        room.setDataValue('hotel' , hotel)

        return room
      })
    )

    res.status(200).json({ data: roomWithHotel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get room from data base according to the id
const getRoomById = async (req, res) => {
  let { id } = req.body;
  try {
    const room = await RoomsModel.findByPk(id, {
      include: [
        {
          model: ReservationModel,
          attributes: ['checkInDate', 'checkOutDate', 'totalPrice'],
        },
        {
          model : HotelsModel ,
          include :[
            {
              model : db.UsersModel
            }
          ]
        },
        {
          model : RoomImagesModel
        }
      ],
    });

    if (!room) {
      return res.status(401).json({ message: "Room not found" });
    }

    res.status(200).json({ data: room });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    userId,
  } = req.body;
  if (
    !number ||
    !price ||
    !guestNumber ||
    !hotelId ||
    isBooked === null ||
    !quality ||
    !description ||
    !userId
  ) {
    return res.status(401).json({
      error: "All fields are required",
    });
  }
  try {
    const newRoom = await RoomsModel.create({
      number,
      price,
      guestNumber,
      hotelId,
      isBooked,
      quality,
      description,
      userId,
    });
    res.status(200).json({ message: "Room added successfully", data: newRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const displayRoomsByHotel = async (req, res) => {
  try {
    const hotelId = req.body.hotelId;
    const rooms = await RoomsModel.findAll({
      where: { hotelId: hotelId }, include:[
        {
          model : RoomImagesModel
        }
      ]
    });
    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found for this hotel" });
    }
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find all rooms that belong to the specified user and include room images
const getRoomsByUserId = async (req, res) => {
  try {
    const id = req.body.id;
    const rooms = await RoomsModel.findAll({
      where: { userId: id },
      include: [
        {
          model: RoomImagesModel,
          attributes: ["imageURL"],
        },
      ],
    });

    res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const displayRoomByOrder = async (req, res) => {
  const { type } = req.body;
  console.log(req.body)
  try {
    let orderCriteria;
    switch (type) {
      case "quality":
        orderCriteria = orderCriteria = [["quality", "ASC"]];
        break;
      case "price":
        orderCriteria = [["price", "ASC"]];
        break;
      case "guestNumber":
        orderCriteria = [["guestNumber", "DESC"]];
        break;
      default:
        orderCriteria = [["createdAt", "DESC"]];
        break;
    }

    const rooms = await RoomsModel.findAll({
      order: orderCriteria,
      include: [{ model: RoomImagesModel }],
    });

    res.status(200).json({ data :rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchRooms = async (req, res) => {
  const { price, guestNumber,quality , city } = req.body.select;
  console.log(req.body)
  const WhereCondition = {};
  let priceCondition;
  let guestNumberCondition;
  
  switch (price) {
    case '100':
      priceCondition = { [Op.lte]: 100 };
      break;
    case '200':
      priceCondition = { [Op.between]: [100, 200] };
      break;
    case '300':
      priceCondition = { [Op.between]: [200, 300] };
      break;
    case '400':
      priceCondition = { [Op.between]: [300, 400] };
      break;
    case '500':
      priceCondition = { [Op.gte]: 400 };
      break;
    default:
      priceCondition = { [Op.lte]: 100 };
      break;
  }

  switch (guestNumber) {
    case '1':
    case '2':
    case '3':
    case '4':
      guestNumberCondition = { [Op.eq]: parseInt(guestNumber, 10) };
      break;
    case '5':
      guestNumberCondition = { [Op.gt]: 4 };
      break;
    default:
      guestNumberCondition = { [Op.gte]: 1 };
      break;
  }


  if (quality && ['High', 'Medium', 'Low'].includes(quality)) {
    WhereCondition.quality = quality;
  }else{
    res.status(200).json({ message: "quality is required" });
  }
  WhereCondition.price  = priceCondition;
  WhereCondition.guestNumber=guestNumberCondition
  try {
    const rooms = await RoomsModel.findAll({
      where: WhereCondition,
      include: [
        {
          model: HotelsModel,
          where: {
            city: city,
          },
        },
        { model: RoomImagesModel }
      ],
    });
   
    if(rooms.length>0){
      res.status(200).json({ data: rooms });
    }else{
      res.status(200).json({ data : [] });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}
export {
  displayRooms,
  getRoomById,
  deleteRoom,
  editRoom,
  addRoom,
  displayRoomsByHotel,
  getRoomsByUserId,
  displayRoomByOrder,
  searchRooms
};
