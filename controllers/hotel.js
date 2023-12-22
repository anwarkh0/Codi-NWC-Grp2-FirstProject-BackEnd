import db from "../models/index.js";
const { HotelsModel, RatingModel, RoomsModel, HotelImagesModel } = db;

//get all hotels with populate for rating
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await HotelsModel.findAll({
      include: [
        {
          model: RatingModel,
          attributes: ["id", "rate", "feedback", "userId"],
        },
        {
          model: HotelImagesModel,
          attributes: ["id", "imageURL"],
        },
      ],
    });

    // Calculate average rating for each hotel
    hotels.forEach((hotel) => {
      const totalRating = hotel.Ratings.reduce(
        (sum, rating) => sum + rating.rate,
        0
      );
      const averageRating = totalRating / hotel.Ratings.length;
      hotel.setDataValue("averageRating", averageRating);
    });

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one hotel with populated rooms and images
export const getHotelById = async (req, res) => {
  const hotelId = req.body.id;

  try {
    const hotel = await HotelsModel.findByPk(hotelId, {
      include: [
        {
          model: RoomsModel,
          attributes: [
            "id",
            "number",
            "quality",
            "guestNumber",
            "isBooked",
            "price",
            "description",
          ],
        },
        {
          model: HotelImagesModel,
          attributes: ["id", "imageUrl"],
        },
        {
          model: RatingModel,
          attributes: ["id", "rate", "feedback", "userId"],
        },
      ],
    });

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create hotel
export const createHotel = async (req, res) => {
  try {
    const { name, city, address, description } = req.body;
    // Validate required fields
    if (!name || !city || !address || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newHotel = await HotelsModel.create({
      name,
      city,
      address,
      description,
    });

    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a hotel by ID
export const updateHotel = async (req, res) => {
  const { name, city, address, description, id } = req.body;

  try {
    const [updatedRows] = await HotelsModel.update(
      {
        name,
        city,
        address,
        description,
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
