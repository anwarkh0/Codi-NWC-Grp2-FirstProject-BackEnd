import Booking from "../models/Booking.js";
import Room from '../models/Room.js'


///':idRomm/:idUser'
const addBooking = async (req, res) => {
    try {

        const { room_id, user_id, checkIn, checkOut, mobileNumber, fullName } = req.body;

        //get Room by id
        let selectedRoom;
        try { selectedRoom = await Room.findById(room_id); } catch (error) { console.log("No room found") }

        //update the status of room
        await Room.findByIdAndUpdate(room_id, { isBooked: true });

        //update the totalPrice according to checkIn and checkOut dates
        let totalPrice = selectedRoom.price * ((checkOut - checkIn) / (24 * 3600 * 1000));


        try {
            let newBooking = new Booking({ room_id, user_id, checkIn, checkOut, mobileNumber, fullName,totalPrice });
            let savedBooking = await newBooking.save();
            res.status(200).json({ message: "Booking added succefully", data: savedBooking })

        }
        catch (error) { console.log('Booking had been created succ'); }



    } catch (error) { 

        res.status(500).json({ error: error })
    }
}


//delete booking remove id and turn isAvailable

const deleteBooking = async (req, res) => {
    try {

        //get booking 
        let booking = await Booking.findById(req.params.id);
        let roomId = booking.room_id;

        //update room status
        await Room.findByIdAndUpdate(roomId, { isBooked: false })

        //delete room
        await Booking.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Booking deleted succefully" })

    } catch (error) {
        res.status(500).json({ error: error })
    }
}


export { addBooking, deleteBooking };

// { "room_id":"653b3d36794a72ae7d3b4f7f",
//  "user_id":"6538e3635cde1f82a091aa8a",
//  "checkIn":"2023-08-08", 
//   "checkOut":"2023-08-16",
//    "mobileNumber":6871648648,
//      "fullName":"souheir" }