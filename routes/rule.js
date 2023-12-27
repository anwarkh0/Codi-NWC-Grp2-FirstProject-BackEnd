import {
    createRule,
    getAllRule,
    updateRule,
    deleteRule,

} from "../controllers/rule";
import express from "express";

const ruleRouter = express.Router()

ruleRouter.post('/create', createRule)
ruleRouter.post('/getAll', getAllRule)
ruleRouter.post('/update', updateRule)
ruleRouter.post('/delete', deleteRule)

export default ruleRouter