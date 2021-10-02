/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */

// eslint-disable-next-line spaced-comment
// small backend to send list of products to front end
import express from 'express';
import cors from 'cors';
import data from './data';

// return webapp obj
const app = express();

// middleware
app.use(cors());

//get the products
app.get('/api/products', (req, res) => {
    // return data array to the client
    res.send(data.products);
});

app.listen(5000, () => {
    // eslint-disable-next-line indent
    console.log('server started at http://localhost:5000');
});
