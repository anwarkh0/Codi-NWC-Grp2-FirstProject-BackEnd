import {addBooking,deleteBooking} from '../controllers/booking.js'
import Router from 'express'
const router=express.Router()


router.post('/:idRomm/:idUser',addBooking);
router.delete('/',deleteBookingBooking);
