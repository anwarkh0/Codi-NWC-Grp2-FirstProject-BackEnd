import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send(`hello ${req.body.username}! log in successful !`);
});
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send(`hello ${req.body.username}! You are logged in !`);
});
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send(`hello Admin ${req.body.username}! You are logged in !`);
});
//get one user
router.get("/:id", verifyUser, getUser);

//get all users
router.get("/", verifyAdmin, getUsers);

//delete user
router.delete("/:id", verifyUser, deleteUser);

//update user
router.put("/:id", verifyUser, updateUser);

export default router;
