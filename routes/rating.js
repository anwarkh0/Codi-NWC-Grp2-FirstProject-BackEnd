import {
    createRate,
    getOneRate,
    getAllRates,
    deleteRate,
    updateRate,
    getRateByHotel
} from "../controllers/rating.js";
import express from "express";

const ratingRoute = express.Router()

ratingRoute.post('/', createRate)
ratingRoute.post('/id', getOneRate)
ratingRoute.get('/', getAllRates)
ratingRoute.patch('/', updateRate)
ratingRoute.delete('/', deleteRate)
ratingRoute.post('/byHotel', getRateByHotel)

export default ratingRoute