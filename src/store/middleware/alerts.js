import cuid from 'cuid';
import { ADD_BTC_TXN } from 'routes/LemonadeStand/modules/bitcoinTxns';
import { convertSatoshisToFormattedBtcString, formatToUsdString } from 'util/textFormattingUtil';
import { calculateTransactionValue, convertSatoshisToBtc } from 'util/bitcoinUtil';

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_ALERT = 'CREATE_ALERT';
export const DELETE_ALERT = 'DELETE_ALERT';

// ------------------------------------
// ACTIONS
// ------------------------------------
export const createAlert = (alertType, message, dismiss) => ({
  type: CREATE_ALERT,
  payload: { alertType, message, dismiss, id: cuid() }
});

export const enableBrowserNotifications = () => dispatch => {
  if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(function(status) {
      // status is "granted", if accepted by user
      var n = new Notification('Title', {
        body: 'I am the body text!',
        icon: '/path/to/icon.png' // optional
      });
    });
  }
};

export const deleteAlert = id => ({ type: DELETE_ALERT, payload: { id } });

// ------------------------------------
// Selectors
// ------------------------------------
export const getBtcPrice = state => parseFloat(state.coinPrices.BTC.price) || 0;

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function alertsReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case CREATE_ALERT:
      const { id, alertType, message } = payload;
      return { ...state, [id]: { id, alertType, message } };
    case DELETE_ALERT:
      const copyOfState = { ...state };
      delete copyOfState[payload.id];
      return { ...copyOfState };
    default:
      return state;
  }
}

// ------------------------------------
// Middleware
// ------------------------------------
export function alertMiddleWare(store) {
  return next =>
    action => {
      switch (action.type) {
        case ADD_BTC_TXN:
          const { amount, publicAddress } = action.payload;
          const state = store.getState();
          const txnAprxVal = calculateTransactionValue(convertSatoshisToBtc(amount), getBtcPrice(state));
          store.dispatch(
            createAlert(
              'success',
              `Bitcoin Address: ${publicAddress} has received 
                ${convertSatoshisToFormattedBtcString(amount)} BTC (~${formatToUsdString(txnAprxVal)})`,
              15000
            )
          );
          break;
        case CREATE_ALERT:
          const { payload: { dismiss, id } } = action;
          if (dismiss) {
            setTimeout(
              () => {
                const { alerts } = store.getState();
                if (alerts[id]) {
                  store.dispatch(deleteAlert(id));
                }
              },
              dismiss
            );
          }
          break;
        default:
          break;
      }

      return next(action);
    };
}
