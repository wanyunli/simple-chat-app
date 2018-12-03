import { SET_USER, REMOVE_USER, SET_AVAILABLE_USERS } from '../constants/ActionTypes';

const initialState = {
  selectedUser: {
    id: null,
    name: null
  },
  list: []
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      const selectedUser = action.data;
      return {
        ...state,
        selectedUser
      };
    }
    case REMOVE_USER: {
      return {
        ...state,
        selectedUser: {
          id: null,
          name: null
        }
      };
    }
    case SET_AVAILABLE_USERS: {
      return {
        ...state,
        list: action.data
      };
    }
    default:
      return state;
  }
}
