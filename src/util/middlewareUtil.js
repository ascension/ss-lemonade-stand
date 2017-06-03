import io from 'socket.io-client';

export const createSocketIoMiddleware = (
  url,
  channels = [],
  { onMessage, onConnectError, onReconnecting, onReconnect }
) => {
  // TODO - Add ability to provide an array of channels
  const socket = io.connect(url);

  return ({ dispatch }) => {
    socket.on('connect_failed', function(error) {});

    socket.on('connect_error', function(error) {
      dispatch(onConnectError(error));
    });

    socket.on('reconnect', function(attemptNum) {
      dispatch(onReconnect(attemptNum));
    });

    socket.on('reconnecting', function(attemptNum) {
      dispatch(onReconnecting(attemptNum));
    });

    for (let i = 0; i < channels.length; i++) {
      socket.on(channels[i], data => {
        dispatch(onMessage(data));
      });
    }

    return next => action => next(action);
  };
};
