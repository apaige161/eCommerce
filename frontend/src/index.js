/* eslint-disable linebreak-style */
import Error404Screen from './screens/Error404Screen';
import HomeScreen from './screens/homeScreen';
import ProductScreen from './screens/ProductScreen';
import { parsRequestUrl } from './utils';

// hold routes
const routes = {
  '/': HomeScreen,
  '/product/:id': ProductScreen,
};

// create router function
const router = async () => {
  const request = parsRequestUrl();
  // get resource if it exists otherwise go to homepage
  const parseUrl = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `${request.verb}` : '');

  // return error page if route does not exist
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  // get the element to fill
  // set content of the main container
  const main = document.getElementById('main-container');

  // render data base on what the user entered
  main.innerHTML = await screen.render();
};

// render on the load event
window.addEventListener('load', router);

window.addEventListener('hashchange', router);