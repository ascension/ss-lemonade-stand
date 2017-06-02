export const createSocketIoMiddleware = (socket, channels = [], eventAction) => {
  // TODO - Add ability to provide an array of channels
  return ({ dispatch }) => {
    for (let i = 0; i < channels.length; i++) {
      socket.on(channels[i], data => {
        dispatch(eventAction(data));
      });
    }
    return next => action => next(action);
  };
};
