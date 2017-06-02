export const createSocketIoMiddleware = (socket, channel, eventAction) => {
  return ({ dispatch }) => {
    socket.on(channel, data => {
      dispatch(eventAction(data));
    });
    return next => action => next(action);
  };
};
