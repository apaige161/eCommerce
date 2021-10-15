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
    );
};

// auth middleware 
export const isAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        res.status(401).send({ message: 'Token is not supplied' });
    } else {
        // get token not "bearer "
        const token = bearerToken.slice(7, bearerToken.length);
        // verify user's token
        jwt.verify(token, config.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(401).send({ message: 'Invalid Token' });
        } else {
            // data is the decoded token (user information, name, email, etc...)
            req.user = data;
            next();
        }
        });
    }
  };