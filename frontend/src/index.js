
import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/homeScreen';
import ProductScreen from './screens/ProductScreen';
import SignInScreen from './screens/SignInScreen';
import CartScreen from './screens/CartScreen';
import { parsRequestUrl } from './utils';

// hold routes
// this data come from the parseUrl function
const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/signin': SignInScreen,
  '/cart': CartScreen,
};

// create router function
const router = async () => {
  const request = parsRequestUrl();
  // get resource if it exists otherwise go to homepage
  const parseUrl = 
    // if resource exists, use it. example: product
    (request.resource ? `/${request.resource}` : '/') 
    // if id exists, use it. example: product/1
    + (request.id ? '/:id' : '')
    // if verb exists, use it. example: <TODO>
    + (request.verb ? `${request.verb}` : '');

  // return error page if route does not exist
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  // get the element to fill
  // set content of the main container
  const main = document.getElementById('main-container');

  // render data base on what the user entered
  // set innerHTML of the 'main-container' to url data. 
    // example: homeScreen "/", show products
  main.innerHTML = await screen.render();
};

// render on the load event
window.addEventListener('load', router);

// fires when the url changes
window.addEventListener('hashchange', router);
