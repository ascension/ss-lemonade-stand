import io from 'socket.io-client';
import { createSocketIoMiddleware } from 'util/middlewareUtil';

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_BITCOIN_PRICE = 'UPDATE_BITCOIN_PRICE';

// ------------------------------------
// ACTIONS
// ------------------------------------
export const updateBitcoinPrice = ({ message }) => {
  return {
    type: UPDATE_BITCOIN_PRICE,
    payload: message
  };
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { btcPrice: 0 };
export default function bitcoinPriceReducer(state = initialState, action) {
  return action.type === UPDATE_BITCOIN_PRICE ? action.payload : state;
}

// ------------------------------------
// Middleware
// ------------------------------------
const socket = io.connect('http://socket.coincap.io');
export const coinCapSocketMiddleWare = createSocketIoMiddleware(socket, 'global', updateBitcoinPrice);
