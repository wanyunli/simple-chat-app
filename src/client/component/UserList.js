import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = {
  title: {
    paddingLeft: 20,
    paddingTop: 20
  }
};

class UserList extends React.Component {
  componentDidMount() {
    const { getAvailableUsers, selectedUser, removeUser } = this.props;
    if (selectedUser.id !== null) {
      removeUser(selectedUser.id);
    }
    getAvailableUsers();
  }

  handleClick = (user, setUser, history) => {
    console.log('here user is:', user);
    setUser(user);
    history.replace({
      pathname: '/chatrooms'
    });
  };

  render() {
    const {
      users, setUser, history, classes
    } = this.props;
    let title;
    if (users.length > 0) {
      title = 'Choose your name';
    } else {
      title = 'Currently no name available, please check a moment later.';
    }
    return (
      <div className={classes.userList}>
        <Typography variant="h5" component="h2" className={classes.title}>
          {title}
        </Typography>
        <List component="nav">
          {users.map(user => (
            <ListItem button divider key={user.id}>
              <ListItemText
                primary={user.name}
                onClick={() => this.handleClick(user, setUser, history)}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ),
  selectedUser: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getAvailableUsers: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired
};

export default withStyles(styles)(UserList);
