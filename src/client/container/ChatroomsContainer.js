import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  joinChatroom, getChatrooms, removeMessages, leaveChatroom
} from '../actions/actions';
import ChatroomList from '../component/ChatroomList';

const mapStateToProps = state => ({
  chatrooms: state.chatrooms.list,
  selectedChatroomId: state.chatrooms.selectedChatroom.id
});
const mapDispatchToProps = dispatch => ({
  joinChatroom: chatroom => dispatch(joinChatroom(chatroom)),
  getChatrooms: () => dispatch(getChatrooms()),
  removeMessages: () => dispatch(removeMessages()),
  leaveChatroom: chatroomId => dispatch(leaveChatroom(chatroomId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatroomList)
);
