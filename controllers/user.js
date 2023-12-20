import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const { UsersModel } = db
// export const register = async (req, res, next) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hash,
//       phone: req.body.phone,
//       img: req.file.path,
//     });
//     await newUser.save();
//     res.status(200).send("User has been created");
//   } catch (err) {
//     next(err);
//   }
// };

// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return res.send("User not found !");
//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect)
//       return res.send("username or password incorrect ! ");

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT
//     );
//     const { password, isAdmin, ...otherDetails } = user._doc;
//     res
//       .cookie("access_token", token, { httpOnlt: true })
//       .status(200)
//       .json({ ...otherDetails });
//   } catch (err) {
//     next(err);
//   }
// };

// export const updateUser = async (req, res, next) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     next(err);
//   }
// };
// export const deleteUser = async (req, res, next) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("User has been deleted.");
//   } catch (err) {
//     next(err);
//   }
// };
// export const getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// };
// export const getUsers = async (req, res, next) => {
//   try {
//     console.log("users");
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     next(err);
//   }
// };
