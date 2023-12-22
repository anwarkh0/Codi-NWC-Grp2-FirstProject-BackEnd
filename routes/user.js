import {
  createUser,
  getOneUser,
  getAllUsers,
  deleteUser,
  updateUser
} from "../controllers/user.js"
import express from "express"

const router = express.Router()

router.post('/create', createUser)
router.get('/getOne', getOneUser)
router.get('/getAll', getAllUsers)
router.put('/update', updateUser)
router.delete('/delete', deleteUser,
)

export default router