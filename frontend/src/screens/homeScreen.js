/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import Rating from '../components/Rating';

const HomeScreen = {
    render: async () => {
        
        // get request from backend
        const response = await axios({
            // set request string
            url: 'http://localhost:5000/api/products',
            // set the header to accept JSON
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // check for errors
        if (!response || response.statusText !== 'OK') {
            return '<div>Error in getting data</div>';
        }

        // set data to variable
        // returns a promise - using await I turn that into real data
        const products = response.data;

        // return list of all products
        return `
        <ul class="products">
            ${products.map((product) => `
                <li>
                    <div class="product">
                        <a href="/#/product/${product._id}">
                            <img src="${product.image}" alt="${product.name}" />
                        </a>
                        <div class="product-name">
                            <a href="/#/product/${product._id}">
                            ${product.name}
                            </a>
                        </div>
                        <div class="product-rating">
                            ${Rating.render({
                                value: product.rating,
                                text: `${product.numReviews} reviews`,
                            })}
                        </div>
                        <div class="product-brand">
                            ${product.brand}
                        </div>
                        <div class="product-price">
                            $${product.price}
                        </div>
                    </div>
                </li>
            `).join('\n')}
        `;
    },
};

export default HomeScreen;
