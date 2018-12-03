import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { receiveMessage, sendMessage } from '../actions/actions';
import Chatroom from '../component/Chatroom';

const mapStateToProps = state => ({
  messages: state.messages.list,
  selectedChatroom: state.chatrooms.selectedChatroom,
  user: state.users.selectedUser
});
const mapDispatchToProps = dispatch => ({
  receiveMessage: message => dispatch(receiveMessage(message)),
  sendMessage: message => dispatch(sendMessage(message))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Chatroom)
);
