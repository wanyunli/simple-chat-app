import * as types from '../constants/ActionTypes';

export const sendMessage = message => ({
  type: types.SEND_MESSAGE,
  data: message
});

export const removeMessages = () => ({
  type: types.REMOVE_MESSAGES
});

export const receiveMessage = message => ({
  type: types.RECEIVE_MESSAGE,
  data: message
});

export const joinChatroom = chatroom => ({
  type: types.JOIN_CHATROOM,
  data: chatroom
});
export const leaveChatroom = chatroomId => ({
  type: types.LEAVE_CHATROOM,
  data: chatroomId
});
export const getChatrooms = () => ({
  type: types.GET_CHATROOMS
});

export const setChatrooms = chatrooms => ({
  type: types.SET_CHATROOMS,
  data: chatrooms
});
export const setUser = user => ({
  type: types.SET_USER,
  data: user
});
export const removeUser = userId => ({
  type: types.REMOVE_USER,
  data: userId
});
export const setAvailableUsers = users => ({
  type: types.SET_AVAILABLE_USERS,
  data: users
});

export const getAvailableUsers = () => ({
  type: types.GET_AVAILABLE_USERS
});

export const refreshPage = data => ({
  type: types.REFRESH_PAGE,
  data
});
