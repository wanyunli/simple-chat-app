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

class ChatroomList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getChatrooms } = this.props;
    getChatrooms();
  }

  handleClick(chatroom) {
    const {
      selectedChatroomId, removeMessages, leaveChatroom, joinChatroom, history
    } = this.props;
    if (selectedChatroomId !== null && selectedChatroomId !== chatroom.id) {
      leaveChatroom(selectedChatroomId);
      removeMessages();
    }
    joinChatroom(chatroom);
    history.push({
      pathname: '/chatroom'
    });
  }

  render() {
    const { chatrooms, classes } = this.props;
    return (
      <div>
        <Typography variant="h5" component="h2" className={classes.title}>
          Choose chatrooms
        </Typography>
        <List component="nav">
          {chatrooms.map(chatroom => (
            <ListItem button divider key={chatroom.id}>
              <ListItemText primary={chatroom.name} onClick={() => this.handleClick(chatroom)} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

ChatroomList.propTypes = {
  chatrooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selectedChatroomId: PropTypes.number,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  joinChatroom: PropTypes.func.isRequired,
  getChatrooms: PropTypes.func.isRequired,
  removeMessages: PropTypes.func.isRequired,
  leaveChatroom: PropTypes.func.isRequired
};

export default withStyles(styles)(ChatroomList);
