import { combineReducers } from 'redux';
import locationReducer from './location';
import bitcoinPriceReducer from './bitcoinPrice';

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    location: locationReducer,
    bitcoinPrice: bitcoinPriceReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
