import mongoose from 'mongoose'

const BookingSchema = mongoose.Schema({
   room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
   },
   user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   checkIn: {
      type: Date,
      required: true
   },
   checkOut: {
      type: Date,
      required: true
   },
   totalPrice: {
      type: Number,
   },
   mobileNumber: {
      type: Number
   },
   fullName: {
      type: String,
      required: true,
   }
});

export default mongoose.model("Booking", BookingSchema)


