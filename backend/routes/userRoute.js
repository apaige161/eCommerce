
import express from 'express';
import User from '../models/userModel'
import expressAsyncHandler from 'express-async-handler';
import { generateToken } from '../util';

const UserRouter = express.Router();

// create admin user
// "/api/users/createadmin"
UserRouter.get(
    "/createadmin", 
    // async handler keep app from crashing if an error occurs
    expressAsyncHandler(
        async(req, res) => {
            try {
                // default admin username/password
                const user = new User({
                    name: 'admin',
                    email: 'admin@example.com',
                    password: 'defaultPassword',
                    isAdmin: true,
                });
                // save admin
                const createdUser = await user.save();
                // response to the front end
                res.send(createdUser);
            } catch(err) {
                res.status(500).send({ message: err.message});
            }
        }
    )        
);

// signin
UserRouter.post(
    '/signin', 
    // async handler keep app from crashing if an error occurs
    expressAsyncHandler(
        async (req, res) => {
            // send request to get user with this username and password
            const signinUser = await User.findOne({
                email: req.body.email,
                password: req.body.password,
            });
            if(!signinUser) {
                res.status(401).send({
                    message: 'Invalid Email or Password',
                });
            } else { // user is valid
                // return user data
                // generate JWT token
                res.send({
                    _id: signinUser._id,
                    name: signinUser.name,
                    email: signinUser.email,
                    isAdmin: signinUser.isAdmin,
                    token: generateToken(signinUser)
                })
            }
        }
    ) 
);

export default UserRouter;