import { hash } from "bcrypt";
import db from "../models/index.js";
import bcrypt from "bcrypt";

/////////
export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const icon = req.file.path;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.UsersModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      image: icon,
    });
    return res
      .status(200)
      .json({ mess: "User created successfully", rating: newUser });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "User coudn't be create" });
  }
};
///////////
export const getOneUser = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await db.UsersModel.findOne({
      where: { id: id },
      include: [
        {
          model: db.ReservationModel,
          include: [
            {
              model : db.RoomsModel
            }
          ]
        },
        {
          model: db.RatingModel,
          include: [
            {
              model : db.HotelsModel
            }
          ]
        },
        {
          model: db.RoomsModel,
          include : [
            {
              model : db.HotelsModel
            }
          ]
        },
        {
          model: db.HotelsModel,
        },
      ],
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch user" });
  }
};
//////////
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.UsersModel.findAll();
    res.status(200).json({data:allUsers});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch Users" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.body.id;
  const icon = req.file?.path;
  const { firstName, lastName, email, password, oldPassword, role } = req.body;

  try {
    const oldUser = await db.UsersModel.findByPk(id);
    const isValidPassword = await bcrypt.compare(oldPassword, oldUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    if (password !== null) {
      var hashedPassword = await bcrypt.hash(password, 10);
    }
    const user = await db.UsersModel.update(
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        image: icon,
      },
      {
        where: { id: id },
      }
    );

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.body.id;
  try {
    await db.UsersModel.destroy({ where: { id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: " could not delete User" });
  }
};
