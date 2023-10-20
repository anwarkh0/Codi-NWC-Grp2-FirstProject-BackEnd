import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";

const router = express.Router();

//get one user
router.get("/:id", getUser);

//get all users
router.get("/", getUsers);

//delete user
router.delete("/:id", deleteUser);

//update user
router.put("/:id", updateUser);

export default router;
