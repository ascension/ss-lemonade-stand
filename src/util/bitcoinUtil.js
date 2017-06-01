import bitcoin from 'bitcoinjs-lib';

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
