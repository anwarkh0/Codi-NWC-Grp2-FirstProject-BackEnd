
  import express from "express"
  import { usersTypeCount,averageWeeklyRevenue,topThreeHotelsByRevenueLastMonth,getRatingsForHotels } from "../controllers/statistics.js"
  import { authenticate, checkRole } from "../middleware/authMiddleware.js"
  
  const statisticRouter = express.Router()
  
  statisticRouter.get('/usersType', usersTypeCount)
  statisticRouter.get('/revenue', averageWeeklyRevenue)
  statisticRouter.get('/top', topThreeHotelsByRevenueLastMonth)
  statisticRouter.get('/rate', getRatingsForHotels)

  export default statisticRouter