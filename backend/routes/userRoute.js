
import express from 'express';
import User from '../models/userModel'
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAuth } from '../util';

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

// register
UserRouter.post(
    '/register', 
    // async handler keep app from crashing if an error occurs
    expressAsyncHandler(
        async (req, res) => {
            
            // create a new user
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: false,
            });

            // access created user
            const createdUser = await user.save();

            if(!createdUser) {
                res.status(401).send({
                    message: 'Invalid user data',
                });
            } else { // user is valid
                // return user data to the front end
                // generate JWT token
                res.send({
                    _id: createdUser._id,
                    name: createdUser.name,
                    email: createdUser.email,
                    isAdmin: createdUser.isAdmin,
                    token: generateToken(createdUser)
                })
            }
        }
    ) 
);

// update user
UserRouter.put(
    '/:id', isAuth,
    // async handler keep app from crashing if an error occurs
    expressAsyncHandler(
        async (req, res) => {
            
            // find user
            const user = await User.findById(req.params.id);

            if(!user) {
                res.status(401).send({
                    message: 'User not found',
                });
            } else { // user is valid
                // if user entered invalid value, use current value
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.password = req.body.password || user.password;

                //save to DB
                const updatedUser = await user.save();

                // return user data to the front end
                // generate JWT token
                res.send({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                    token: generateToken(updatedUser),
                });
            }
        }
    ) 
);

export default UserRouter;