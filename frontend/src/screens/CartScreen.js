import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parsRequestUrl } from "../utils";

// save a retrieve items from local storage
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
        return `<div>Cart Screen</div>
            <div>${getCartItems().length}</div>`;
    }
};

export default CartScreen;