import { addBtcTxn } from '../modules/bitcoinTxns';

let blockchainSocket;

function makeWebsocket(url, protocols) {
  const socket = new WebSocket(url, protocols);

  function send(data) {
    try {
      socket.send(JSON.stringify(data));
      return true;
    } catch (error) {
      return false;
    }
  }

  function on(eventType, listener) {
    try {
      socket.addEventListener(eventType, listener);
      return true;
    } catch (error) {
      return false;
    }
  }

  return { on, send, socket };
}

export const subscribeToAddress = address => {
  if (blockchainSocket) {
    return blockchainSocket.send({ op: 'addr_sub', addr: `${address}` });
  }

  return false;
};

export const initWebsocket = ({ dispatch, getState }) => {
  if (!blockchainSocket) {
    blockchainSocket = makeWebsocket('wss://ws.blockchain.info/inv');

    blockchainSocket.on('open', () => {
      blockchainSocket.on('message', event => {
        const message = event.data ? JSON.parse(event.data) : undefined;
        const txnInfo = message.x;

        if (message.op === 'utx') {
          const { bitcoinAddresses: { addresses } } = getState();
          const { out, hash: txnId } = txnInfo;
          const addressFound = out.find(txn => {
            return addresses[txn.addr];
          });

          if (addressFound) {
            const { addr, value } = addressFound;
            const txnDetails = { publicAddress: addr, amount: value, txnId, rawInfo: txnInfo };
            dispatch(addBtcTxn(txnDetails));
          }
        }
      });
      blockchainSocket.on('close', () => {});
    });

    // Keep WS open by pinging every 25 sec
    setInterval(
      () => {
        blockchainSocket.send({ op: 'ping' });
      },
      25000
    );
  }

  return blockchainSocket;
};


