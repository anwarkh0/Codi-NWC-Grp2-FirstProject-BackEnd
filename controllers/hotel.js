
// //create Hotel
// export const createHotel = async (req, res, next) => {
//   req.body.image = req.file.path;
//   const newHotel = new Hotel(req.body);
//   try {
//     const savedHotel = await newHotel.save();
//     res.status(200).json(savedHotel);
//   } catch (err) {
//     next(err);
//   }
// };
// //update Hotel
// export const updateHotel = async (req, res, next) => {
//   try {
//     const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
//       $set: req.body,
//       new: true,
//     });
//     res.status(200).json(updatedHotel);
//   } catch (err) {
//     next(err);
//   }
// };
// //delete Hotel
// export const deleteHotel = async (req, res, next) => {
//   try {
//     const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
//     res.status(200).json(deletedHotel);
//   } catch (err) {
//     next(err);
//   }
// };
// //get get hotel by id
// export const getHotel = async (req, res, next) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     res.status(200).json(hotel);
//   } catch (err) {
//     next(err);
//   }
// };
// //get all Hotels
// export const getHotels = async (req, res, next) => {
//   try {
//     const hotels = await Hotel.find();
//     res.status(200).json({ data: hotels });
//   } catch (err) {
//     next(err);
//   }
// };
