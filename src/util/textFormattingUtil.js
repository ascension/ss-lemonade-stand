import numeral from 'numeral';
import { convertSatoshisToBtc } from './bitcoinUtil';
export const convertSatoshisToFormattedBtcString = amountInSatoshis =>
  numeral(convertSatoshisToBtc(amountInSatoshis)).format('0.0000[0000]');

export const formatToUsdString = amount => numeral(amount).format('$0,0.00');
