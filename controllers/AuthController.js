import db from "../models/index.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt"

export const signUp = async (req, res) => {

    const { firstName, lastName, password, email, role, } = req.body
    const image = req.file.filename
    try {
        //check if user already exist
        const hashedPassword = await bcrypt.hash(password, 10)
        const existingUser = await db.UsersModel.findOne({ where: { email } })
        if (existingUser) {
            res.status(400).json({ message: 'Email already in use' })
        }
        //create new user
        const user = await db.UsersModel.create({
            firstName,
            lastName,
            image: image,
            password: hashedPassword,
            email,
            role
        })
        res.status(200).json({ message: 'User created successfully', user })

    }
    catch (err) {
        console.log(err)
    }
}
export const logIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await db.UsersModel.findOne({ where: { email } })
        if (!user) {
            res.status(401).json({ message: 'Invalid email' })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            res.status(401).json({ message: 'Invalid  password' })
        }

        const token = generateToken(user)

        // Set token in HTTP-only cookie
        return res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }).status(200).json({ status: 200, message: 'Login successful' });


    }
    catch (err) {
        console.log(err)
    }
}
export const logOut = async (req, res) => {

    try {
        res.clearCookie('token')
        return res.status(200).json({ message: "logout successflu" })
    }
    catch (err) {
        console.log(err)
    }
}