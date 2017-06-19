// ------------------------------------
// Constants
// ------------------------------------
export const ADD_BTC_TXN = 'ADD_BTC_TXN';

// ------------------------------------
// Actions
// ------------------------------------
export const addBtcTxn = txnInfo => ({
  type: ADD_BTC_TXN,
  payload: txnInfo
});
