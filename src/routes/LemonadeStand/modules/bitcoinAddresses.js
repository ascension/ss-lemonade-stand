import { createSelector } from 'reselect';
import { generateBitcoinKeyPair } from 'util/bitcoinUtil';
import { ADD_BTC_TXN } from './bitcoinTxns';
import { subscribeToAddress } from '../services/Blockchain';
import { getTransactionsForAddress } from '../services/api/blockchainApiService';

// ------------------------------------
// Constants
// ------------------------------------
export const CREATE_BITCOIN_ADDRESS = 'CREATE_BITCOIN_ADDRESS';

export const FETCH_BITCOIN_ADDRESS_DETAILS_BEGIN = 'FETCH_BITCOIN_ADDRESS_DETAILS_BEGIN';
export const FETCH_BITCOIN_ADDRESS_DETAILS_SUCCESS = 'FETCH_BITCOIN_ADDRESS_DETAILS_SUCCESS';
export const FETCH_BITCOIN_ADDRESS_DETAILS_FAILURE = 'FETCH_BITCOIN_ADDRESS_DETAILS_FAILURE';

export const fetchBitcoinAddressDetailsBegin = bitcoinAddress => ({
  type: FETCH_BITCOIN_ADDRESS_DETAILS_BEGIN,
  payload: { bitcoinAddress }
});
export const fetchBitcoinAddressDetailsSuccess = payload => ({ type: FETCH_BITCOIN_ADDRESS_DETAILS_SUCCESS, payload });
export const fetchBitcoinAddressDetailsFailure = () => ({ type: FETCH_BITCOIN_ADDRESS_DETAILS_FAILURE });

// ------------------------------------
// Selectors
// ------------------------------------
export const getBitcoinAddresses = state => state.bitcoinAddresses.addresses;

export const getCountOfBitcoinAddresses = createSelector(getBitcoinAddresses, addresses => {
  return Object.keys(addresses).length;
});

export const getAddressesWithoutTransaction = createSelector(getBitcoinAddresses, addresses => {
  return Object.values(addresses).filter(address => address.transactions.length === 0);
});

export const getAddressesWithTransaction = createSelector(getBitcoinAddresses, addresses => {
  return Object.values(addresses).filter(address => address.transactions.length > 0);
});

// ------------------------------------
// Actions
// ------------------------------------
export const addBitcoinAddress = (memo, publicAddress) => {
  return { type: CREATE_BITCOIN_ADDRESS, payload: { memo, publicAddress } };
};

export const createCustomerBitcoinAddress = ({ memo, bitcoinAddress, generateNewAddress }) => {
  let publicAddress;

  if (generateNewAddress) {
    const bitcoinKeyPair = generateBitcoinKeyPair();
    publicAddress = bitcoinKeyPair.getAddress();
  } else {
    publicAddress = bitcoinAddress;
  }

  subscribeToAddress(publicAddress);

  return addBitcoinAddress(memo, publicAddress);
};

export const fetchBitcoinAddressDetails = bitcoinAddress =>
  dispatch => {
    dispatch(fetchBitcoinAddressDetailsBegin(bitcoinAddress));
    return getTransactionsForAddress(bitcoinAddress)
      .then(response => {
        debugger;
        return dispatch(fetchBitcoinAddressDetailsSuccess(response.data));
      })
      .catch(() => {
        return dispatch(fetchBitcoinAddressDetailsFailure());
      });
  };

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_BITCOIN_ADDRESS]: ({ addresses, ...state }, { payload }) => {
    const { publicAddress, memo } = payload;
    return { ...state, addresses: { ...addresses, [publicAddress]: { publicAddress, memo, transactions: [] } } };
  },
  [ADD_BTC_TXN]: ({ addresses, ...state }, { payload }) => {
    const { publicAddress, amount, txnId } = payload;

    const address = addresses[publicAddress];
    if (address) {
      const mergedTransactions = [{ txnId, amount }, ...address.transactions];
      return {
        ...state,
        addresses: { ...addresses, [publicAddress]: { ...address, transactions: mergedTransactions } }
      };
    }

    return { ...state, addresses };
  }
};

const initialState = {
  isLoading: false,
  addresses: {}
};

export default function bitcoinAddressesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
