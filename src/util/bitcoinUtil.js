import bitcoin from 'bitcoinjs-lib';

const satoshisPerBtc = 100000000;

export const convertSatoshisToBtc = amountSatoshis => amountSatoshis / satoshisPerBtc;

export const calculateTransactionValue = (amount, price) => amount * price;


export const generateBitcoinKeyPair = () => {
  return bitcoin.ECPair.makeRandom();
};

export const isValidBitcoinAddress = address => {
  try {
    bitcoin.address.toOutputScript(address, bitcoin.networks.bitcoin);
    return true;
  } catch (error) {
    return false;
  }
}
