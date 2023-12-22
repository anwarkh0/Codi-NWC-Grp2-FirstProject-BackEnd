import db from "../models/index.js";
const { UsersModel } = db;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const google = async (req, res, next) => {
    try {
        const user = await UsersModel.findOne({ where: { email: req.body.email } });

        if (user) {
            const token = jwt.sign({ id: user.id }, 'secretKey');
            const { password, ...rest } = user.get();
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            const generatedName = req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4);

            const newUser = await UsersModel.create({
                firstName: generatedName,
                email: req.body.email,
                password: hashedPassword,
                image: req.body.photo,
            });

            const token = jwt.sign({ id: newUser.id }, 'secretKey');
            const { password, ...rest } = newUser.get();
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
