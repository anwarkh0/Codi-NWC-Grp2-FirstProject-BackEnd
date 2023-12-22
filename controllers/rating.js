import db from "../models/index.js"
/////////
export const createRate = async (req, res) => {
    const { rate, feedback, hotelId } = req.body
    try {
        const newRate = await db.RatingModel.create({ rate, feedback, hotelId })
        return res.status(200).json({ mess: "Rate created successfully", rating: newRate })
    }
    catch (err) {
        console.log(err)
        res.state(404).json({ error: "rating coudn't be create" })
    }
}
///////////
export const getOneRate = async (req, res) => {
    const id = req.body.id
    try {
        const rate = await db.RatingModel.findOne({ where: { id } })
        res.status(200).json(rate)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "cannot fetch rate" });

    }
}
//////////
export const getAllRates = async (req, res) => {
    try {
        const allRate = await db.RatingModel.findAll()
        res.status(200).json(allRate)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "cannot fetch rates" });

    }
}
///////////
export const updateRate = async (req, res) => {
    const id = req.body.id
    const { rate, feedback, hotelId } = req.body
    try {
        const rate = await db.RatingModel.update({
            rate,
            feedback,
            hotelId
        }, { where: { id } })
    } catch (err) {
        console.log(err)
    }
}
/////////////   
export const deleteRate = async (req, res) => {
    const id = req.body.id
    try {
        await db.RatingModel.destroy({ where: { id } })
        res.status(200).json({ message: "rate deleted successfully" });

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: " could not delete rate" });

    }
}