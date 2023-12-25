import express from "express";

import {
    logIn,
    logOut,
    signUp
} from "../controllers/AuthController.js";
import cors from "cors";
import uploadImage from "../middleware/multer.js";
const router = express.Router()

router.post("/singup", uploadImage.single("image"), signUp)
router.post('/login', logIn);
router.post('/logout', logOut)
export default router
