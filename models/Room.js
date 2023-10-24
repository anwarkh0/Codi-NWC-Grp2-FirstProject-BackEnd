import mongoose, { Schema } from "mongoose";
const RoomSchema = Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  people: {
    type: Number,
    required: true
  },
  images: {
    type: String,
  },
  servicesIcon: {
    type: [String],
  },
  servicesDesc: {
    type: [String],
  },
  rulesIcon: {
    type: [String],
  },
  rulesDesc: {
    type: [String],
  },
  unavailableDates: {
    type: [Date],
  },
});

const Room = new mongoose.model("Room", RoomSchema);

export default Room;
