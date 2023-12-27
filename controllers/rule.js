import db from "../models/index.js";

///////
export const createRule = async (req, res) => {
    const { title, hotelId } = req.body
    const image = req.file.filename

    try {
        const newRule = await db.RulesModel.create({
            title,
            hotelId,
            image
        })
        return res
            .status(200)
            .json({ mess: "rule creact successfully", rule: newRule })
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: "rule coudn't be create" })

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
    const image = req.file.filename
    const { title, hotelId } = req.body
    try {
        const rule = await db.RulesModel.update(
            {
                title,
                hotelId,
                image
            },
            {
                where: { id }
            })
    } catch (error) {
        console.log(error)
    }
} 