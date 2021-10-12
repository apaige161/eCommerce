import { getProduct } from "../api";
import Rating from "../components/Rating";
import { hideLoading, parsRequestUrl, showLoading } from "../utils";


const ProductScreen = {

    after_render: () => {
        const request = parsRequestUrl();
        document.getElementById("add-button").addEventListener('click', 
        () => [
            //redirect to cart screen
            document.location.hash = `/cart/${request.id}`
        ]
        )
    },




    // render product sreen
    render: async () => {
        
        // get request from parseUrl function
        const request = parsRequestUrl();

        // call loading elements before ajax request
        showLoading();

        // product returns a promise
        const product = await getProduct(request.id);
        // null check
        if(product.error) {
            return(`<div>${product.error}</div>`)
        }

        // hide load elements
        hideLoading();
        return `
            <div class="content">
                <div class="back-to-result">
                    <a href="/#/">Back to result</a>
                </div>
                <div class="details">
                    <div class="details-imgage">
                        <img src="${product.image}" alt=${product.name} />
                    </div>
                    <div class="details-info">
                        <ul>
                            <li>
                                <h1>${product.name}</h1>
                            </li>
                            <li>
                                ${Rating.render({value: product.rating, text: `${product.numReviews} reviews`})}
                            </li>
                            <li>
                                Price: <strong>$${product.price}</strong>
                            </li>
                            <li>
                                Description:
                                <div>${product.description}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="details-action">
                        <ul>
                            <li>
                                Price: $${product.price}
                            </li>
                            <li>
                                Status: 
                                    ${product.countInStock > 0 ? `<span class="success"> In Stock </span>` : 
                                    `<span class="error"> Unavailable </span>`}
                            </li>
                            <li>
                                <button id="add-button" class="fw primary"> Add to cart </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }
};

export default ProductScreen;