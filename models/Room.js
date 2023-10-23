// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const RoomSchema = new mongoose.Schema({});

// export default mongoose.model("Room", RoomSchema);



import mongoose, { Schema } from "mongoose"
const RoomSchema = Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    poeple: {
        type: Number,
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
    },
    dates: {
        type: [String]
    }



})


const Room = new mongoose.model('Room', RoomSchema);

export default Room;