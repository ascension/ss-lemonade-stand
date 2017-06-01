import { generateBitcoinKeyPair } from 'util/bitcoinUtil';
export const CREATE_BITCOIN_ADDRESS = 'CREATE_BITCOIN_ADDRESS';

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

  return addBitcoinAddress(memo, publicAddress);
};

const initialState = {
  isLoading: false,
  addresses: {}
};

const ACTION_HANDLERS = {
  [CREATE_BITCOIN_ADDRESS]: ({ addresses, ...state }, { payload }) => {
    const { publicAddress, memo } = payload;
    return { ...state, addresses: { ...addresses, [publicAddress]: { publicAddress, memo } } };
  }
};

export default function bitcoinAddressesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
