import { hash } from "bcrypt"
import db from "../models/index.js"
import bcrypt from "bcrypt"

/////////
export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body
  const image = req.file.filename

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await db.UsersModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      image
    })
    return res
      .status(200)
      .json({ mess: "User created successfully", rating: newUser })
  }
  catch (err) {
    console.log(err)
    res.status(404).json({ error: "User coudn't be create" })
  }
}
///////////
export const getOneUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await db.UsersModel.findOne({ where: { id } })
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "cannot fetch user" });

  }
}
//////////
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.UsersModel.findAll()
    res.status(200).json(allUsers)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "cannot fetch Users" });

  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const image = req.file.filename;
  const { firstName, lastName, email, password, role } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.UsersModel.update(
      {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        image,
      },
      {
        where: { id }
      })
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    await db.UsersModel.destroy({ where: { id } })
    res.status(200).json({ message: "User deleted successfully" });

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: " could not delete User" });

  }
}