import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setUser, removeUser, getAvailableUsers } from '../actions/actions';
import UserList from '../component/UserList';

const mapStateToProps = state => ({
  users: state.users.list,
  selectedUser: state.users.selectedUser
});
const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  removeUser: userId => dispatch(removeUser(userId)),
  getAvailableUsers: () => dispatch(getAvailableUsers())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserList)
);
