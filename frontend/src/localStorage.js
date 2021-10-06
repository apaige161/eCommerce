
// file to hold local storage I/O

// get items
export const getCartItems = () => {
    // if this cartItems key exists, convert it to JSON
    // if no cartItems exist, it should be an empty array
    // local storage saves in string format
    const cartItems = localStorage.getItem('cartItems')? 
        JSON.parse(localStorage.getItem('cartItems')):
        [];
    return cartItems;
}

// set cart items
export const setCartItems = (cartItems) => {
    // save items
    // save as string
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}