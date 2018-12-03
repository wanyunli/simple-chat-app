import { combineReducers } from 'redux';
import users from './users';
import chatrooms from './chatrooms';
import messages from './messages';

export default combineReducers({
  users,
  chatrooms,
  messages
});
