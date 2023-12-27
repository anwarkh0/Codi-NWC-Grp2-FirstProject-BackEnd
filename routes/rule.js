import {
    createRule,
    getAllRule,
    updateRule,
    deleteRule,

} from "../controllers/rule.js";
import express from "express";
import uploadImage from "../middleware/multer.js";

const ruleRouter = express.Router()

ruleRouter.post('/create', uploadImage.single("icon"), createRule)
ruleRouter.get('/getAll', getAllRule)
ruleRouter.put('/update/:id', uploadImage.single("icon"), updateRule)
ruleRouter.delete('/delete/:id', deleteRule)

export default ruleRouter