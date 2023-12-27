import db from "../models/index.js";
/////////
export const createRate = async (req, res) => {
  const { userId, rate, feedback, hotelId } = req.body;
  try {
    const newRate = await db.RatingModel.create({
      rate,
      feedback,
      hotelId,
      userId,
    });
    return res
      .status(200)
      .json({ mess: "Rate created successfully", rating: newRate });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "rating coudn't be create" });
  }
};
///////////
export const getOneRate = async (req, res) => {
  const id = req.body.id;
  try {
    const rate = await db.RatingModel.findOne({ where: { id } });
    res.status(200).json(rate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch rate" });
  }
};
//////////
export const getAllRates = async (req, res) => {
  try {
    const allRate = await db.RatingModel.findAll({
      include: [
        {
          model: db.UsersModel,
          attributes: ["id", "firstName", "lastName", "role", "email"],
        },
      ],
    });
    res.status(200).json(allRate);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch rates" });
  }
};
///////////
export const updateRate = async (req, res) => {
  const id = req.body.id;
  const { rate, feedback, hotelId } = req.body;
  try {
    const updatedRate = await db.RatingModel.update(
      {
        rate,
        feedback,
        hotelId,
      },
      { where: { id } }
    );
    return res.status(200).json(updatedRate);
  } catch (err) {
    console.log(err);
  }
};
/////////////
export const deleteRate = async (req, res) => {
  const id = req.body.id;
  try {
    await db.RatingModel.destroy({ where: { id } });
    res.status(200).json({ message: "rate deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: " could not delete rate" });
  }
};

export const getRateByHotel = async (req, res) => {
  const id = req.body.id;
  try {
    if (!id) {
      return res.status(401).json({
        error: "no id selected",
      });
    }
    const ratings = await db.RatingModel.findAll({
      where: { hotelId: id },
      include: [
        {
          model: db.UsersModel,
          attributes: ["id", "firstName", "lastName", "role", "email"],
        },
      ],
    });
    
    res.status(200).json(ratings);
  } catch (error) {
    return res.status(500).json(error);
  }
};
