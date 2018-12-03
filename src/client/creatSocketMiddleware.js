import {
  receiveMessage,
  removeMessages,
  setAvailableUsers,
  setChatrooms,
  joinChatroom,
  setUser,
  removeUser
} from './actions/actions';
import {
  SET_USER,
  REMOVE_USER,
  GET_CHATROOMS,
  JOIN_CHATROOM,
  LEAVE_CHATROOM,
  GET_AVAILABLE_USERS,
  SEND_MESSAGE,
  REFRESH_PAGE
} from './constants/ActionTypes';

export default function creatSocketMiddleware(socket) {
  let isFirstTimeInvoke = true;
  return store => next => (action) => {
    if (isFirstTimeInvoke) {
      isFirstTimeInvoke = false;
      socket.on('msgFromServer', data => next(receiveMessage(data)));
      socket.on('availableUsers', data => next(setAvailableUsers(data)));
      socket.on('chatrooms', data => next(setChatrooms(data)));
      socket.on('receiveMessage', data => next(receiveMessage(data)));
    }
    const { type, data } = action;
    switch (type) {
      case SET_USER:
        next(setUser(data));
        socket.emit('setUser', data);
        break;
      case REMOVE_USER:
        next(removeUser(data));
        socket.emit('removeUser', data);
        break;
      case GET_AVAILABLE_USERS:
        socket.emit('getAvailableUsers');
        break;
      case GET_CHATROOMS:
        socket.emit('getChatrooms');
        break;
      case JOIN_CHATROOM:
        next(joinChatroom(data));
        socket.emit('joinChatroom', data);
        break;
      case LEAVE_CHATROOM:
        socket.emit('leaveChatroom', data);
        break;
      case SEND_MESSAGE:
        socket.emit('sendMessage', data);
        break;
      case REFRESH_PAGE:
        socket.emit('refreshPage', data);
        break;
      default:
        next(removeMessages());
    }
  };
}
