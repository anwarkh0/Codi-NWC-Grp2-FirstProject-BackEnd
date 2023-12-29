import db from "../models/index.js";
import { getRoomNumber } from "./calculation.js";
const { HotelsModel, RatingModel, RoomsModel, HotelImagesModel, UsersModel, RulesModel } = db;

//get all hotels with populate for rating
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await HotelsModel.findAll({
      include: [
        {
          model: RatingModel,
        },
        {
          model: HotelImagesModel,
        },
        {
          model: RoomsModel
        }
      ],
    });

    // Calculate average rating and get room numbers for each hotel
    const hotelsWithRoomNumbers = await Promise.all(
      hotels.map(async (hotel) => {
        const totalRating = hotel.Ratings.reduce(
          (sum, rating) => sum + parseInt(rating.rate, 10),
          0
        );
        const rating = hotel.Ratings.length > 0
          ? totalRating / hotel.Ratings.length
          : 0; // Prevent division by zero

        // Count the number of rooms for each hotel
        const roomCount = hotel.Rooms ? hotel.Rooms.length : 0;

        // Add room number, room count, and average rating to hotel data
        hotel.setDataValue("rating", rating);
        hotel.setDataValue("roomNumber", roomCount);

        return hotel;
      })
    );

    res.status(200).json(hotelsWithRoomNumbers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one hotel with populated rooms and images
export const getHotelById = async (req, res) => {
  const id = req.body.id;

  try {
    const hotel = await HotelsModel.findByPk(id, {
      include: [
        {
          model: RoomsModel,
        },
        {
          model: HotelImagesModel,
        },
        {
          model: RatingModel,
        },
        {
          model : UsersModel,
        },
        {
          model: RulesModel
        }
      ],
    });

    const totalRating = hotel.Ratings.reduce(
      (sum, rating) => sum + parseInt(rating.rate, 10),
      0
    );
    const rating = hotel.Ratings.length > 0
      ? totalRating / hotel.Ratings.length
      : 0;

    res.status(200).json({hotel, rating});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create hotel
export const createHotel = async (req, res) => {
  try {
    const { name, city, address, description , userId } = req.body;
    // Validate required fields
    if (!name || !city || !address || !description || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newHotel = await HotelsModel.create({
      name,
      city,
      address,
      description,
      userId
    });

    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a hotel by ID
export const updateHotel = async (req, res) => {
  const { name, city, address, description, id , userId} = req.body;

  try {
    const [updatedRows] = await HotelsModel.update(
      {
        name,
        city,
        address,
        description,
        userId
      },
      {
        where: { id: id },
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const updatedHotel = await HotelsModel.findByPk(id);
    res.status(200).json({
      msg: `Hotel ${updateHotel.name} was updated successfuly`,
      data: updatedHotel,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete hotel by id 
export const deleteHotel = async (req, res) => {
  const id = req.body.id;

  try {
    const deletedRows = await HotelsModel.destroy({
      where: { id: id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.status(200).json(`hotel with id: ${id} has been deleted successfuly`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

    // Find all hotels that belong to the specified user 
export const getHotelsByUserId = async (req, res) => {
  try {
    const id = req.body.id; 

    const hotels = await HotelsModel.findAll({
      where: { userId : id },
      include: [
        {
          model: RatingModel,
          attributes: ['rate', 'feedback'], 
        },
        {
          model: RoomsModel,
          attributes: ['number', 'quality', 'guestNumber', 'price', 'description'],
        },
        {
          model: HotelImagesModel,
          attributes: ['icon'], 
        },
      ],
    });

    res.status(200).json({ hotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};