import { JOIN_CHATROOM, LEAVE_CHATROOM, SET_CHATROOMS } from '../constants/ActionTypes';

const initialState = {
  selectedChatroom: {
    id: null,
    name: null
  },
  list: []
};

export default function chatrooms(state = initialState, action) {
  switch (action.type) {
    case JOIN_CHATROOM: {
      const selectedChatroom = action.data;
      return {
        ...state,
        selectedChatroom
      };
    }
    case LEAVE_CHATROOM: {
      return {
        ...state,
        selectedChatroom: { id: null, name: null }
      };
    }
    case SET_CHATROOMS: {
      return {
        ...state,
        list: action.data
      };
    }
    default:
      return state;
  }
}
