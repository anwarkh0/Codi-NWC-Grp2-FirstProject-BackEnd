import db from "../models/index.js";
const { HotelsModel, RatingModel, RoomsModel, HotelImagesModel } = db;

export const getRoomNumber = async (hotelId) => {
    try {
      const rooms = await RoomsModel.findAll({
        where: {
          hotelId: hotelId,
        },
      });
  
      // Calculate the total room number for the hotel
      const totalRooms = rooms.reduce((sum, room) => sum + room.number, 0);
  
      return {
        success: true,
        data: {
          totalRooms: totalRooms,
        },
      };
    } catch (error) {
      console.error('Error fetching room number:', error);
      return {
        success: false,
        error: 'Error fetching room number',
      };
    }
  };
