import db from "../models/index.js";
const { UsersModel } = db;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const google = async (req, res, next) => {
    const {name , email , photo} = req.body
    try {
        const user = await UsersModel.findOne({ where: { email } });

        if (user) {
            const token = jwt.sign({ id: user.id }, 'secretKey');
            const { password, ...rest } = user.get();
            res.cookie('token', token, { httpOnly: true }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);

            // Assuming the Google data includes both first and last names
            const fullName = name.split(' ');
            const generatedFirstName = fullName[0] || 'DefaultFirstName';
            const generatedLastName = fullName.length > 1 ? fullName.slice(1).join(' ') : 'DefaultLastName';

            const newUser = await UsersModel.create({
                firstName: generatedFirstName,
                lastName: generatedLastName,
                email: email,
                password: hashedPassword,
                image: photo,
                role : 'Customer'
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
