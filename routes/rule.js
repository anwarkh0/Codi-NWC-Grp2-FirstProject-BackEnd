import {
    createRule,
    getAllRule,
    updateRule,
    deleteRule,

} from "../controllers/rule.js";
import express from "express";
import uploadImage from "../middleware/multer.js";

const ruleRouter = express.Router()

ruleRouter.post('/', uploadImage.single("icon"), createRule)
ruleRouter.get('/', getAllRule)
ruleRouter.patch('/', uploadImage.single("icon"), updateRule)
ruleRouter.delete('/', deleteRule)

export default ruleRouter