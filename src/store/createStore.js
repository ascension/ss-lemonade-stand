import { applyMiddleware, compose, createStore as createReduxStore } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import makeRootReducer from './reducers';
import { updateLocation } from './location';
import { coinCapSocketMiddleWare } from './bitcoinPrice';

const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const blockchainSocket = new WebSocket('wss://ws.blockchain.info/inv');
  blockchainSocket.onopen = event => {
    // blockchainSocket.send(JSON.stringify({ "op": "unconfirmed_sub" }));
    // Listen for messages
    blockchainSocket.onmessage = function(event) {
      console.log('Client received a message', event);
    };

    // Listen for socket closes
    blockchainSocket.onclose = function(event) {
      console.log('Client notified socket has closed', event);
    };
  };

  // socket.connect('wss://ws.blockchain.info/inv', { path: '/'});
  // blockchainSocket.on('connect_error', function (error) {
  //   debugger;
  // });
  const middleware = [thunk, coinCapSocketMiddleWare];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  let composeEnhancers = compose;

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middleware), ...enhancers)
  );
  store.asyncReducers = {};

  // Listen to browser history events and dispatch action
  // Invoke to un-subscribe
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store.dispatch));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

export default createStore;
