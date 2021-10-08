
// small backend to send list of products to front end
import express from 'express';
import cors from 'cors';
import data from './data';
import mongoose from 'mongoose';
import config from './config';
import UserRouter from './routes/userRoute';

// connect to the database
const connectionParams={}
mongoose.connect(config.MONGODB_URL, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


// return webapp obj
const app = express();

/*********************************************************************************
 *
 * middleware
 *  
**********************************************************************************/ 
//headers
app.use(cors());
//handle users
app.use('/api/users', UserRouter)

//get all the products
app.get('/api/products', (req, res) => {
    // return data array to the client
    res.send(data.products);
});

// get one product
app.get('/api/products/:id', (req, res) => {
    // send back one product by ID to client
    // find the correct item
    const product = data.products.find(x => x._id === req.params.id)
    // null check
    if(product) {
        res.send(product);
        //console.log(`${product.name} was sent to the client`)
    } else {
        res.sendStatus(404).send({message: 'Product Not Found!'});
    }
    
})


app.listen(5000, () => {
    console.log('server started at http://localhost:5000');
});
