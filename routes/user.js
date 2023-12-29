import {
  createUser,
  getOneUser,
  getAllUsers,
  deleteUser,
  updateUser
} from "../controllers/user.js"
import express from "express"
import uploadImage from "../middleware/multer.js"
import { authenticate, checkRole } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post('/create', uploadImage.single("icon"), createUser)
router.post('/getOne', getOneUser)
router.get('/getAll', getAllUsers)
router.patch('/update', uploadImage.single("icon"), updateUser)
router.delete('/delete', deleteUser,
)

export default router