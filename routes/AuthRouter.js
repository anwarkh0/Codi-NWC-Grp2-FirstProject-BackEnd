import express from "express";

import {
    logIn,
    logOut,
    signUp
} from "../controllers/AuthController.js";
import cors from "cors";
import uploadImage from "../middleware/multer.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { loggedInUser } from "../controllers/AuthController.js";
const router = express.Router()

router.post("/signup", uploadImage.single("image"), signUp)
router.post('/login', logIn);
router.post('/logout', logOut)
router.get('/logged-in-user', authenticate, loggedInUser)
export default router
