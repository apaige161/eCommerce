
import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/homeScreen';
import ProductScreen from './screens/ProductScreen';
import SignInScreen from './screens/SignInScreen';
import CartScreen from './screens/CartScreen';
import { parsRequestUrl } from './utils';
import Header from './components/Header';

// hold routes
// this data come from the parseUrl function
const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/signin': SignInScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
};

/* Root Function */
// create router function
const router = async () => {
  const request = parsRequestUrl();

  // get resource if it exists otherwise go to homepage
  const parseUrl = 
    // if resource exists, use it. example: product, otherwise redirect to homepage
    (request.resource ? `/${request.resource}` : '/') 
    // if id exists, use it. example: product/1
    + (request.id ? '/:id' : '')
    // if verb exists, use it. example: GET, POST
    + (request.verb ? `${request.verb}` : '');

  /*******************************************************************
   * 
   * Build the page data
   * 
   *******************************************************************/

  // return error page if route does not exist
  // if a defined route exists, set the value to screen
  // routes accesses the object by searching for the parseUrl key
    // for example if parseUrl = '/', screen = "HomeScreen"
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  //render header
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();

  // get the element to fill
  // set content of the main container
  const main = document.getElementById('main-container');
  // render data based on what the user entered
  // set innerHTML of the 'main-container' to url data
    // example: homeScreen "/", show products
  main.innerHTML = await screen.render();

  if(screen.after_render) await screen.after_render();
};

// render on the load event
window.addEventListener('load', router);

// fires when the url changes
window.addEventListener('hashchange', router);






