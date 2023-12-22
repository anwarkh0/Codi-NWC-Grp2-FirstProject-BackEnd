import {
    createRate,
    getOneRate,
    getAllRates,
    deleteRate,
    updateRate
} from "../controllers/rating.js";
import express from "express";
``
const ratingRoute = express.Router()

ratingRoute.post('/create', createRate)
ratingRoute.get('/getOne', getOneRate)
ratingRoute.get('/getAll', getAllRates)
ratingRoute.put('/update', updateRate)
ratingRoute.delete('/delete', deleteRate)

export default ratingRoute