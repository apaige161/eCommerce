import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parsRequestUrl } from "../utils";

// save items to local storage
const addToCart = (item, forceUpdate = false) => {
    // get local storage items 
    let cartItems = getCartItems();
    //check if user has any items
    // compare to current product
    const itemExists = cartItems.find(x => x.product === item.product)
    // replace item with new item ID if item exists in cart
    //  just update do not add
    if(itemExists) { // item is already in shopping cart
        cartItems = cartItems.map((x) => x.product === itemExists.product? item : x)
    } else { 
        // concatenate this item to cart items
        cartItems = [...cartItems, item]
    }

    // save to loacl storage
    setCartItems(cartItems);
};

const CartScreen = {
    // after render
    after_render:() => {

    },
    // render cart sreen
    render: async ()=>{
        // parse URL to get products in cart
        const request = parsRequestUrl();
        if(request.id) { // user clicked add to cart button
            // get product from backend by id
            const product = await getProduct(request.id)
            // add product to cart
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,
            })
        } else { // user selected cart from menu

        }

        const cartItems = getCartItems();
        return `
            <div class="content cart">
                <div class="cart-list">
                    <ul class="cart-list-container">
                        <li>
                            <h3>Shopping Cart</h3>
                            <div>Price</div>
                        </li>
                        <!-- Dynamicly add cart items -->
                        <!-- Map all cart items -->
                        ${
                            cartItems.length === 0? 
                                '<div>Cart is empty. <a href="/#/">Go Shopping</a></div>':
                                cartItems.map(item => `
                                    <li>
                                        <div class="cart-image">
                                            <img src="${item.image}" alt="${item.name}" />
                                        </div>
                                        <div class="cart-name">
                                            <!-- Send user to product -->
                                            <div>
                                                <a href="/#/product/${item.product}">
                                                    ${item.name}
                                                    name
                                                </a>
                                            </div>
                                            <div>
                                                Qty: 
                                                <select class="qty-select" id="${item.product}">
                                                    <option value="1">1</option>
                                                </select>
                                                <button class="delete-button" id="${item.product}">Delete</button>
                                            </div>
                                        </div>
                                        <div class="cart-price">
                                            $${item.price}
                                        </div>
                                    </li>
                                `).join('\n') //prevents commas between li items
                        }
                    </ul>
                </div> <!-- End of cart-list -->
                <!-- Second column -->
                <div class="cart-action">
                        <h3>
                            <!-- reduce the array to a single value/ find how many items are in the cart -->
                            Subtotal (${cartItems.reduce((sum, currentNumber) => sum + currentNumber.qty, 0)} Items ) 
                            :
                            $${cartItems.reduce((sum, currentAmount) => sum + currentAmount.price * currentAmount.qty, 0)}
                        </h3>
                        <button id="checkout-button" class="primary fw">
                            Proceed to Checkout
                        </button>
                </div>
            </div>
            
        `;
    }
};

export default CartScreen;