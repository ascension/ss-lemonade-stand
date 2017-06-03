import { combineReducers } from 'redux';
import locationReducer from './middleware/location';
import coinPricesReducer from './middleware/coinPrices';
import alertsReducer from './middleware/alerts';

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    location: locationReducer,
    coinPrices: coinPricesReducer,
    alerts: alertsReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return;
  }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
