import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

//get all the rooms saved in rooms model
const displayRooms = async (req, res) => {
  let rooms = [];

    try {
        if (req.params.sorting === undefined) {
            rooms = await Room.find();
        }
        else if (req.params.sorting === 'Low-price') {
            rooms = await Room.find().sort({ price: 1 });
            1
        }
        else if (req.params.sorting === 'High-price') {
            rooms = await Room.find().sort({ price: -1 });

        }

        res.status(200).json({ 'dataRooms': rooms })

    }

    // res.status(200).json({ dataRooms: rooms });
  catch (error) {
    res.status(500).json({ error: error });
  }
};

//get room from data base according to the id
const selectRoom = async (req, res) => {
  try {
    const room = await Room.find({ id: req.params.id });
    res.status(200).json({ data: room });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//delete it from data base room and remove id from hotel
const deleteRoom = async (req, res) => {
  let roomId = req.params.roomId;
  let hotelId = req.params.hotelId;

  try {
    await Room.findByIdAndDelete(roomId);
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
    } catch (error) {
      res.status(500).json({ error });
    }
    res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

//find from data base then apdate
const editRoom = async (req, res) => {
    try {
        const editedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ data: editedRoom })

    } catch (error) { res.status(500).json({ "error": error }) }
}



//add room and add id to the hotel
const addRoom = async (req, res) => {
  let hotelId = req.params.hotelId;
  req.body.image = req.file.path;

  // const { name, price, people, services, rules, dates } = req.body;
  let newRoom = new Room(req.body);
  try {
    let savedRoom = await newRoom.save();

        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id }, })
        } catch (error) {
            res.status(500).json({ error: error })
        }

        res.status(200).json({ message: "room added succefully", data: savedRoom })
    } catch (error) {
      res.status(500).json({ error: error });
      }};

//     res.status(200).json({ message: "room added succefully", data: savedRoom });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };



const displayRoomsByHotel = async (req, res) => {
    try {
        let hotel = await Hotel.findById(req.params.hotelId);

        if (hotel && hotel.rooms != []) {
            let data = await hotel.populate({ path: "rooms", model: "Room" });

            res.status(200).json({ data: data })
        }
        else {
            res.status(404).json({ message: "No rooms are available" })
        }
    }
    catch (error) { res.status(500).json({ error: error }) }

}

export {
  displayRooms,
  selectRoom,
  deleteRoom,
  editRoom,
  addRoom,
  displayRoomsByHotel,
};
