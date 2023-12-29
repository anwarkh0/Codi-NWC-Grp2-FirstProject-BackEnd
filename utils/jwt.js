import jwt from "jsonwebtoken"
import dotend from "dotenv"
dotend.config()

const secret = `${process.env.JWT_SECRET}` || 'secretKey'

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            role: user.role,
            image: user.image
        },
        secret,
        { expiresIn: "24h" }
    )
}

export const verifyToken = (token) => {
    return jwt.verify(token, secret)
}