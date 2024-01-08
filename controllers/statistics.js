import { Op } from 'sequelize';
import db from "../models/index.js";
import Sequelize from 'sequelize';
import { format, getISOWeek } from 'date-fns';
const { UsersModel,ReservationModel,HotelsModel,RoomsModel ,RatingModel,sequelize} = db;
const { fn, literal,col } = Sequelize;
 const usersTypeCount = async (req, res) => {

  let date = new Date();
  const startDate = date.setDate(date - 7);
  try {
    const userCounts = await UsersModel.findAll({
      attributes: ["role", [Sequelize.fn("COUNT", "role"), "count"]],
      where: {
        role: ["Hotel Manager", "Customer"], // Filter by specific user types
        createdAt: {
          [Op.gte]: startDate, 
        },
      },
      group: ["role"],
    });

    res.status(200).json({ data: userCounts });

  } catch (err) {
    console.error("Error retrieving user counts:", err);
  }
 }



 const averageWeeklyRevenue = async (req, res) => {
  const currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1); // Calculate date 1 month ago

  try {
    const reservations = await ReservationModel.findAll({
      attributes: [
        [fn('SUM', literal('totalPrice')), 'totalRevenue'],
        [fn('WEEK', fn('DATE', col('checkInDate'))), 'week'],
        [col('checkInDate'), 'checkInDate'], // Define checkInDate attribute and its alias
      ],
      include: [
        {
          model: RoomsModel,
          attributes: [],
          include: [
            {
              model: HotelsModel,
              attributes: ['id', 'name'], // Include hotel ID and name
            },
          ],
        },
      ],
      where: {
        checkInDate: {
          [Op.gte]: lastMonthDate,
          [Op.lt]: currentDate,
        },
      },
      group: ['Room.Hotel.id', 'checkInDate'],
      raw: true,
    });

    const formattedData = {};

    reservations.forEach(item => {
      const hotelId = item['Room.Hotel.id'];
      const week = getISOWeek(new Date(item.checkInDate)); // Get week number using date-fns
      const totalRevenue = item.totalRevenue || 0; // Ensure revenue exists or default to 0
      const hotelName = item['Room.Hotel.name'];

      if (!formattedData[hotelId]) {
        formattedData[hotelId] = {
          hotelId,
          hotelName,
          weeklyData: {},
        };
      }

      formattedData[hotelId].weeklyData[week] = totalRevenue;
    });

    // Fill in zero-revenue weeks for each hotel
    const weeksWithinLastMonth = getWeeksBetweenDates(lastMonthDate, currentDate);

    Object.values(formattedData).forEach(hotel => {
      weeksWithinLastMonth.forEach(week => {
        if (!hotel.weeklyData[week]) {
          hotel.weeklyData[week] = 0;
        }
      });
    });

    res.status(200).json({ data: Object.values(formattedData) });
  } catch (err) {
    console.error('Error retrieving average weekly revenue:', err);
    res.status(500).json({ error: 'Error retrieving average weekly revenue' });
  }
};

function getWeeksBetweenDates(startDate, endDate) {
  const weeks = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    weeks.push(getISOWeek(currentDate));
    currentDate.setDate(currentDate.getDate() + 7);
  }
  return weeks;
}

const topThreeHotelsByRevenueLastMonth = async (req, res) => {
  const currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1); // Calculate date 1 month ago

  try {
    const hotelsRevenue = await ReservationModel.findAll({
      attributes: [
        [fn('SUM', literal('totalPrice')), 'totalRevenue'],
        'Room.Hotel.id',
        'Room.Hotel.name',
      ],
      include: [
        {
          model: RoomsModel,
          attributes: [],
          include: [
            {
              model: HotelsModel,
              attributes: [], // Exclude hotel attributes from the result
            },
          ],
        },
      ],
      where: {
        checkInDate: {
          [Op.gte]: lastMonthDate,
          [Op.lt]: currentDate,
        },
      },
      group: ['Room.Hotel.id', 'Room.Hotel.name'],
      order: [[fn('SUM', literal('totalPrice')), 'DESC']], // Order by totalRevenue descending
      limit: 3,
      raw: true,
    });

    res.status(200).json({ data: hotelsRevenue });

  } catch (err) {
    console.error('Error retrieving top three hotels by revenue in the last month:', err);
    res.status(500).json({ error: 'Error retrieving top three hotels by revenue in the last month' });
  }
};



const getRatingsForHotels = async (req, res) => {
  try {
    const ratingsData = await HotelsModel.findAll({
      attributes: [
        'id',
        'name',
        [
          sequelize.fn('SUM', sequelize.literal('CASE WHEN Ratings.rate = 1 THEN 1 ELSE 0 END')),
          'rating_1_count',
        ],
        [
          sequelize.fn('SUM', sequelize.literal('CASE WHEN Ratings.rate = 2 THEN 1 ELSE 0 END')),
          'rating_2_count',
        ],
        [
          sequelize.fn('SUM', sequelize.literal('CASE WHEN Ratings.rate = 3 THEN 1 ELSE 0 END')),
          'rating_3_count',
        ],
        [
          sequelize.fn('SUM', sequelize.literal('CASE WHEN Ratings.rate = 4 THEN 1 ELSE 0 END')),
          'rating_4_count',
        ],
        [
          sequelize.fn('SUM', sequelize.literal('CASE WHEN Ratings.rate = 5 THEN 1 ELSE 0 END')),
          'rating_5_count',
        ],
      ],
      include: [
        {
          model: RatingModel,
          attributes: [], // Exclude all other attributes of Ratings
        },
      ],
      group: ['Hotels.id'],
    });

    res.status(200).json({ ratingsData });
  } catch (error) {
    console.error('Error retrieving ratings for hotels:', error);
    res.status(500).json({ error: 'Error retrieving ratings for hotels' });
  }
};




export { usersTypeCount,averageWeeklyRevenue, topThreeHotelsByRevenueLastMonth,getRatingsForHotels };