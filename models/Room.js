import mongoose, { Schema } from "mongoose";
const RoomSchema = Schema({
  number: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
  },
  type: {
    type: String,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  price: {
    type: Number,
    required: true,
  },
  maxpeople: {
  maxpeople: {
    type: Number,
    required: true
  },
  servicesIcon: {
    type: [String],
  },
  servicesDesc: {
    type: [String],
  },
  isBooked: {
    type: Boolean,
    required: true
  }
});

const Room = new mongoose.model("Room", RoomSchema);

export default Room;
