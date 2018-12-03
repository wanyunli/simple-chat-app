import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { refreshPage } from '../actions/actions';
import Wrapper from '../component/Wrapper';

const mapStateToProps = state => ({
  selectedChatroom: state.chatrooms.selectedChatroom,
  selectedUser: state.users.selectedUser
});
const mapDispatchToProps = dispatch => ({
  refreshPage: data => dispatch(refreshPage(data))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapper)
);
