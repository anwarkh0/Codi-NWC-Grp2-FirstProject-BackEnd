import db from "../models/index.js";

///////
export const createRule = async (req, res) => {
    const { description, hotelId } = req.body;

    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const icon = req.file.path; 

        const newRule = await db.RulesModel.create({
            description,
            hotelId,
            icon
        });

        return res.status(200).json({ mess: "Rule created successfully", rule: newRule });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

///////
export const getAllRule = async (req, res) => {
    try {
        const allRules = await db.RulesModel.findAll({
            include:[
                {
                    model: db.HotelsModel
                }
            ]
        })
        res.status(200).json(allRules)
    } catch (error) {
        console.log(error)
    }
}

///////
export const deleteRule = async (req, res) => {
    const id = req.body.id
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
    const id  = req.body.id
    const icon = req.file?.path; 
    const { description, hotelId } = req.body
    try {
        const oldRule = await db.RulesModel.findByPk(id)
        const rule = await db.RulesModel.update(
            {
                description,
                hotelId,
                icon : icon ? icon : oldRule.icon
            },
            {
                where: { id }
            })
            res.status.json(rule)
    } catch (error) {
        console.log(error)
    }
} 