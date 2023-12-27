import db from "../models/index.js";

///////
export const createRule = async (req, res) => {
    const { description, hotelId } = req.body
    const icon = req.file.filename

    try {
        const newRule = await db.RulesModel.create({
            description,
            hotelId,
            icon
        })
        return res
            .status(200)
            .json({ mess: "rule creact successfully", rule: newRule })
    } catch (error) {
        console.log(error)
        res.status(404).json(error.message)

    }
}

///////
export const getAllRule = async (req, res) => {
    try {
        const allRules = await db.RulesModel.findAll()
        res.status(200).json(allRules)
    } catch (error) {
        console.log(error)
    }
}

///////
export const deleteRule = async (req, res) => {
    const { id } = req.params
    try {
        await db.RulesModel.destroy({ where: { id } })
        res.status(200).json({ message: "rule deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "could not delete rule" })
    }
}
///////
export const updateRule = async (req, res) => {
    const { id } = req.params
    const icon = req.file.filename
    const { description, hotelId } = req.body
    try {
        const rule = await db.RulesModel.update(
            {
                description,
                hotelId,
                icon
            },
            {
                where: { id }
            })
            res.status.json(rule)
    } catch (error) {
        console.log(error)
    }
} 