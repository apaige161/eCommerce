import jwt from "jsonwebtoken"
import config from "./config"


export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        // keep jwt secret in config/env file
        config.JWT_SECRET
    )
}