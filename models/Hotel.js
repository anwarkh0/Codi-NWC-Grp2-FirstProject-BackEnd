import mongoose from "mongoose";
const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
  },
  images: {
    type: [String]
  },
  rules: { Icons: { type: [String] }, Desc: { type: [String] } },
  roomNumber: {
    type: Number,
  },
  rooms:
    [{type:mongoose.Schema.Types.ObjectId,ref:'Room'}]
  

});

export default mongoose.model("Hotel", HotelSchema);

// {
//   "name":"Lancaster",
//   "city":"Beirut",
//   "address":"raoucheh",
//   "rate":4,
//   "images":["imaag1","imag2"],
//   "rules":{"Icons":["ima1","im2"],"Desc":["desc1","desc2"]},
//   "roomNumber":2
// }