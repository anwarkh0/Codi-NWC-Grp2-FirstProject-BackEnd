import mongoose, { Schema } from "mongoose";
const RoomSchema = Schema({
  number: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
  type: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required: true,
  },

  maxpeople: {
    type: Number,
    required: true
  },
  rules:{Icons:{type:[String]},Desc:{type:[String]}}
,
  isBooked: {
    type: Boolean,
    default:false,
    required: true
  },
});

const Room = new mongoose.model("Room", RoomSchema);

export default Room;


// {
//   "number":200,
//   "images":"im1,im2",
//   "type":"King",
//   "price":200,
//   "maxpeople":3,
// "rules":{"Icons":["icon1"],"Desc":["desc1"]},
// "isBooked":false
// }