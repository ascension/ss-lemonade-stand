import io from 'socket.io-client';
import { createSocketIoMiddleware } from 'util/middlewareUtil';

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_COIN_PRICE = 'UPDATE_COIN_PRICE';

// ------------------------------------
// Selectors
// ------------------------------------
export const getBtcPrice = state => parseFloat(state.coinPrices.BTC.price) || 0;

// ------------------------------------
// Actions
// ------------------------------------
export const updateCoinPrice = data => {
  return {
    type: UPDATE_COIN_PRICE,
    payload: data
  };
};

export const updateBtcPrice = ({ message: { btcPrice, ...restOfMessage } }) => {
  return updateCoinPrice({ ...restOfMessage, price: btcPrice, coin: 'BTC' });
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { BTC: { price: 0 } };
export default function coinPricesReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COIN_PRICE:
      const { payload: { coin, ...coinInfo } } = action;
      return { ...state, [coin]: coinInfo };
    default:
      return state;
  }
  // return action.type === UPDATE_COIN_PRICE ? action.payload : state;
}

// ------------------------------------
// Middleware
// ------------------------------------
const socket = io.connect('http://socket.coincap.io');
export const coinCapSocketMiddleWare = createSocketIoMiddleware(socket, ['global'], updateBtcPrice);
