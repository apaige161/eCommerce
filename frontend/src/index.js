
import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/homeScreen';
import ProductScreen from './screens/ProductScreen';
import SignInScreen from './screens/SignInScreen';
import CartScreen from './screens/CartScreen';
import RegisterScreen from './screens/RegisterScreen'
import { hideLoading, parsRequestUrl, showLoading } from './utils';
import Header from './components/Header';
import ProfileScreen from './screens/ProfileScreen';

// hold routes
// this data come from the parseUrl function
const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
  '/signin': SignInScreen,
  '/cart/:id': CartScreen,
  '/cart': CartScreen,
  '/register': RegisterScreen,
  '/profile': ProfileScreen,
};

/*********************************************************************
 * 
 * Root Function 
 *  - Handles what to load to the browser
 *  
 **********************************************************************/

// create router function
const router = async () => {

  // call loading function
  showLoading();

  // get url data, sets resource, ID, and verb to an object
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
   *  - Find the screen to render from the url
   *     - `routes` accesses the object by searching for the `parseUrl` key
   *        - for example if <key> parseUrl = '/', <value> screen = "HomeScreen"
   *     - return error page if route does not exist
   *     - if a defined route exists, set the value to screen
   * 
   *  - Render components
   *    - Select the element to fill with js data
   *    - Set innerHTML to what is going to be rendered (component data)
   *      - example (for home): main.innerHTML = await HomeScreen.render();
   *      - example (for cart): main.innerHTML = await CartScreen.render();
   *    - Run after_render() if any data changes
   * 
   *******************************************************************/

  // set the correct screen to render
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  // render header
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();

  // render main section
  const main = document.getElementById('main-container');
  main.innerHTML = await screen.render();

  // some screens do not have an after render function
  // the conditional just helps reduce errors
  if(screen.after_render) await screen.after_render();

  // hide loading elements when everything is finished loading
  hideLoading();
};

/*********************************************************************
 * 
 * Load events 
 *  - runs code on first page load
 *  - runs code based on url changes
 * 
 **********************************************************************/

// render on the load event
window.addEventListener('load', router);

// fires when the url changes
window.addEventListener('hashchange', router);






