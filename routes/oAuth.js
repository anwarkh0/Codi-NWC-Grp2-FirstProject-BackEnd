import { loggedInUser } from "../controllers/AuthController.js";
import { google } from "../controllers/oAuth.js";
import express from 'express'

const googleRouter = express.Router()

googleRouter.post('/' , google , loggedInUser)

export default googleRouter