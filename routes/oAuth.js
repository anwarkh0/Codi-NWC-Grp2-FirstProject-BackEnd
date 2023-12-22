import { google } from "../controllers/oAuth.js";
import express from 'express'

const googleRouter = express.Router()

googleRouter.post('/' , google)

export default googleRouter