
import mongoose, { Schema } from "mongoose"
const RoomSchema = Schema({
    name: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true

    },
    poeple: {
        type: Number,
        required:true,
        min: 1,
        max: 2
    },
    servicesIcon: {
        type: [String],
    },
    servicesDesc: {
        type: [String]
    },
    rulesIcon: {
        type: [String]
    },
    rulesDesc: {
        type: [String]
    }

})


const Room = new mongoose.model('Room', RoomSchema);

export default Room;