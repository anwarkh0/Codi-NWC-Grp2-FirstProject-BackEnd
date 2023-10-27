import mongoose from 'mongoose'

const BookingSchema=mongoose.Schema({
    room_id:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    checkIn:{
        type:Date,
        required:true
     },
     checkOut:{
        type:Date,
        required:true
     },
     totalPrice:{
        type:Number,
     },
     mobileNumber:{
        type:Number
     },
     fulltName:{
        type:String,
        required:true,
     }
     });

     export default mongoose.model("Booking",BookingSchema)


    