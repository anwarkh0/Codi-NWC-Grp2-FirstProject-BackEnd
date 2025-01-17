// import { addBooking, deleteBooking } from '../controllers/booking.js'
// import express from 'express'
// const router = express.Router()

// router.post('/', addBooking);
// router.delete('/:id', deleteBooking);

// export default router;
import express from "express";
import {
  getAllReservations,
  addReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByUserId,
  getReservationsByRoomId
} from "../controllers/reservation.js";

const reservationRouter = express.Router();

reservationRouter.post("/", addReservation);
reservationRouter.patch("/", updateReservation);
reservationRouter.delete("/", deleteReservation);
reservationRouter.get("/", getAllReservations);
reservationRouter.post("/id", getReservationById);
reservationRouter.post('/user' , getReservationsByUserId)
reservationRouter.post('/room' , getReservationsByRoomId)

export default reservationRouter;
