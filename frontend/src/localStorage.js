
// file to hold local storage I/O

/** Cart local **/
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


/** User local **/
export const setUserInfo = ({
    _id = '',
    name = '',
    email = '',
    password = '',
    token = '',
    isAdmin = false,
  }) => {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        _id,
        name,
        email,
        password,
        token,
        isAdmin,
      })
    );
  };

export const getUserInfo = () => {
    // if any data exists parse to json
    // fail case, set data to empty strings
    return localStorage.getItem('userInfo')?
        JSON.parse(localStorage.getItem('userInfo')) :
        {name: '', email: '', password: ''}
}