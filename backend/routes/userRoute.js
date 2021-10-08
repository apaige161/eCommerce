
import express from 'express';
import User from '../models/userModel'

const UserRouter = express.Router();

// create admin user
// "/api/users/createadmin"
UserRouter.get("/createadmin", async(req, res) => {
    try {
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
})

export default UserRouter;