// //create Hotel
// export const createHotel = async (req, res, next) => {
//   req.body.image = req.file.path;
//   const newHotel = new Hotel(req.body);
//   try {
//     const savedHotel = await newHotel.save();
//     res.status(200).json(savedHotel);
//   } catch (err) {
//     next(err);
//   }
// };
// //update Hotel
// export const updateHotel = async (req, res, next) => {
//   try {
//     const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
//       $set: req.body,
//       new: true,
//     });
//     res.status(200).json(updatedHotel);
//   } catch (err) {
//     next(err);
//   }
// };
// //delete Hotel
// export const deleteHotel = async (req, res, next) => {
//   try {
//     const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
//     res.status(200).json(deletedHotel);
//   } catch (err) {
//     next(err);
//   }
// };
// //get get hotel by id
// export const getHotel = async (req, res, next) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     res.status(200).json(hotel);
//   } catch (err) {
//     next(err);
//   }
// };
// //get all Hotels
// export const getHotels = async (req, res, next) => {
//   try {
//     const hotels = await Hotel.find();
//     res.status(200).json({ data: hotels });
//   } catch (err) {
//     next(err);
//   }
// };
import db from "../models/index.js";
const { HotelsModel } = db;


//get all hotels with populate for rating 
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await HotelsModel.findAll({
      include: [{
        model: Rating,
        attributes: ['rate'],
      }],
    });

    // Calculate average rating for each hotel
    hotels.forEach((hotel) => {
      const totalRating = hotel.Ratings.reduce((sum, rating) => sum + rating.rate, 0);
      const averageRating = totalRating / hotel.Ratings.length;
      hotel.setDataValue('averageRating', averageRating);
    });

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get one hotel with populated rooms and images
const getHotelById = async (req, res) => {
  const hotelId = req.body.id;

  try {
    const hotel = await HotelsModel.findByPk(hotelId, {
      include: [{
        model: Rooms,
        attributes: ['number', 'quality', 'guestNumber', 'isBooked', 'price', 'description'],
      }, {
        model: HotelImages,
        attributes: ['imageUrl'],
      }],
    });

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//create hotel
export const createHotel = async (req, res) => {
  const { name, city, address, description } = req.body;

  // Validate required fields
  if (!name || !city || !address || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
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
  const { name, city, address, description , id} = req.body;

  // Validate required fields
  if (!name || !city || !address || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

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

    const updatedHotel = await HotelsModel.findByPk(hotelId);
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
