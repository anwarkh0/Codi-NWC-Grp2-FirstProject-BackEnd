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

router.post('/create', uploadImage.single("image"), createUser)
router.get('/getOne', authenticate, getOneUser)
router.get('/getAll', authenticate, checkRole(["admin"]), getAllUsers)
router.put('/update', authenticate, uploadImage.single("image"), updateUser)
router.delete('/delete', authenticate, checkRole(["admin"]), deleteUser,
)

export default router