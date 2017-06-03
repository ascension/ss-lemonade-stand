import io from 'socket.io-client';
import { createSocketIoMiddleware } from 'util/middlewareUtil';

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_COIN_PRICE = 'UPDATE_COIN_PRICE';
export const COIN_PRICE_CONNECTION_ERROR = 'COIN_PRICE_CONNECTION_ERROR';
export const COIN_PRICE_RECONNECTING = 'COIN_PRICE_RECONNECTING';
export const COIN_PRICE_RECONNECT_SUCCESS = 'COIN_PRICE_RECONNECT_SUCCESS';

// ------------------------------------
// Selectors
// ------------------------------------
export const getBtcPrice = state => parseFloat(state.coinPrices.BTC.price) || 0;

// ------------------------------------
// Actions
// ------------------------------------
export const updateCoinPrice = data => ({
  type: UPDATE_COIN_PRICE,
  payload: data
});

export const coinPriceConnectionError = error => ({
  type: COIN_PRICE_CONNECTION_ERROR,
  payload: error
});

export const coinPriceReconnecting = attemptNum => ({
  type: COIN_PRICE_RECONNECTING,
  payload: { attemptNum }
});

export const coinPriceReconnectSuccess = attemptNum => ({
  type: COIN_PRICE_RECONNECT_SUCCESS,
  payload: { attemptNum }
});

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
    case COIN_PRICE_CONNECTION_ERROR:
      return { ...state, connectionError: true };
    case COIN_PRICE_RECONNECTING:
      return { ...state, reconnecting: true };
    default:
      return state;
  }
  // return action.type === UPDATE_COIN_PRICE ? action.payload : state;
}

// ------------------------------------
// Middleware
// ------------------------------------

export const coinCapSocketMiddleWare = createSocketIoMiddleware('http://socket.coincap.io', ['global'], {
  onMessage: updateBtcPrice,
  onConnectError: coinPriceConnectionError,
  onReconnecting: coinPriceReconnecting,
  onReconnect: coinPriceReconnectSuccess
});
