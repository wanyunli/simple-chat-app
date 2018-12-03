import { RECEIVE_MESSAGE, SEND_MESSAGE, REMOVE_MESSAGES } from '../constants/ActionTypes';

const initialState = {
  list: []
};

export default function chatroom(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_MESSAGE: {
      const { list } = state;
      return {
        list: list.concat([action.data])
      };
    }
    case SEND_MESSAGE: {
      const { list } = state;
      return {
        list: list.concat([action.data])
      };
    }
    case REMOVE_MESSAGES:
      return {
        list: []
      };
    default:
      return state;
  }
}
