import Booking from "../models/Booking";
import Room from '../models/Room.js'

const addBooking = async (req, res) => {
    let idRoom = req.params.idRoom;
    let idUser = req.params.idUser;

    let newBooking = new Booking(req.body)
    try {
        let savedBooking = await newBooking.save();

        try {
            await Booking.findByIdAndUpdate(savedBooking._id, { $push: { room_id: idRoom, user_id: idUser }, })
        } catch (error) {
            res.status(500).json({ error: error })
        }


        //change the status of room after adding it ti the DB (as booked room)
        try {
            savedBooking.room_id.map(async(elt) => await Room.findByIdAndUpdate(elt, { isBooked: true }))
        }
        catch (error) {
            res.status(500).json({ error: error })
        }

        res.status(200).json({ message: "Booking added succefully", data: savedBooking })
    } catch (error) {
        res.status(500).json({ error: error })


        //totalPrice value roomPrice?* disc Date
    }
}


//delete booking remove id and turn isAvailable
// const deleteBooking = async (req, res) => {
// let idBooking=req.params.idBooking;
  


//      try {
//             savedBooking.room_id.map(elt => Room.findByIdAndUpdate(elt, { isAvailable: true}))
//         }
//         catch (error) {
//             res.status(500).json({ error: error })
//         }
    

//         try {
//             await Booking.findByIdAndDelete(idBooking)
//         } catch (error) {
//             res.status(500).json({ error: error })
//         }


//         //isAvailble to false use lookup to get room according  to id  then accesss to isAvailable  to true
       
//         res.status(200).json({ message: "Booking added succefully", data: savedBooking })
//     } catch (error) {
//         res.status(500).json({ error: error })


//         //totalPrice value roomPrice?* disc Date
//     }
// }


export { addBooking, deleteBooking };