import Room from "../models/Room.js"


const displayRooms = async (req, res) => {

    try {
        let rooms = await Room.find();
        res.status(200).json({ 'dataRooms': rooms })
    }
    catch (error) { res.status(500).json({ "error": error }) }
}



const selectRoom = async (req, res) => {
    try {
        const room = await Room.find({ "id": req.params.id });
        res.status(200).json({ "data": room });
    } catch (error) { res.status(500).json({ "error": error }) }
}


const deleteRoom = async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({ "message": "Room deleted" });
    } catch (error) { res.status(404).json({ "error": error }) }
}



const editRoom = async (req, res) => {
    try {
        const editedRoom = await Room.findByIdAndApdate(req.params.id, req.body, { new: true })
        res.status(200).json({ data: editedRoom })

    } catch (error) { res.status(500).json({ "error": error }) }
}


const addRoom = async (req, res) => {
    try {
        const { name, price, people, services, rules, dates } = req.body;
        let newRoom = new Room({ name, price, people, services, rules, dates })
        await newRoom.save();
        res.status(200).json({ message: "room added succefully", data: displayRooms() })

    } catch (error) {
        res.status(500).json({ error: error })
    }
}


const displayRoomsByHotel = (req, res) => {

    res.status(200).json({ message: "hotelsRoom" })

}

export { displayRooms, selectRoom, deleteRoom, editRoom, addRoom, displayRoomsByHotel };