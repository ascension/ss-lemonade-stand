import axios from 'axios';

const blockchainInfoApi = axios.create({
  baseURL: 'https://blockchain.info',
  // timeout: 10000,
  headers: {
    // Accept: 'application/json',
    // 'Access-Control-Allow-Origin': 'http://foo.example',
    // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    // 'Access-Control-Request-Headers': 'Content-Type',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export const getTransactionsForAddress = bitcoinAddress => {
  return blockchainInfoApi.get(`/rawaddr/${bitcoinAddress}?cors=true`);
};
