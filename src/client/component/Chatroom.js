import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
  chatroom: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    paddingLeft: 20,
    paddingTop: 20
  },
  messageForm: {
    display: 'flex',
    backgroundColor: '#0abab5'
  },
  msgContainer: {
    flex: 1,
    overflow: 'auto'
  },
  list: {
    paddingBottom: 0
  },
  listItem: {
    display: 'flex'
  },
  button: {
    flexBasis: '20%',
    margin: '16px 10px',
    padding: '10px 12px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  textField: {
    flexBasis: '85%',
    marginLeft: 10,
    marginBottom: 16,
    borderRadius: 3,
    border: 0,
    backgroundColor: 'white'
  },
  userName: {
    flexBasis: '15%'
  },
  messageText: {
    flexBasis: '80%',
    wordBreak: 'break-word'
  }
};

class Chatroom extends React.Component {
  messagesEnd = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      inputMsg: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollChatToBottom = this.scrollChatToBottom.bind(this);
  }

  componentDidMount() {
    this.scrollChatToBottom();
  }

  componentDidUpdate() {
    this.scrollChatToBottom();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { inputMsg } = this.state;
    const { sendMessage, user, selectedChatroom } = this.props;
    if (inputMsg !== '') {
      const data = {
        chatroomId: selectedChatroom.id,
        user,
        message: inputMsg
      };
      sendMessage(data);
      this.setState({ inputMsg: '' });
    }
  }

  handleChange(event) {
    this.setState({ inputMsg: event.target.value });
  }

  scrollChatToBottom() {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { messages, selectedChatroom, classes } = this.props;
    const { inputMsg } = this.state;

    return (
      <div className={classes.chatroom}>
        <React.Fragment>
          <CssBaseline />
          <Paper square className={classes.msgContainer}>
            <Typography variant="h5" component="h2" className={classes.title}>
              Welcome to
              {' '}
              {selectedChatroom.name}
            </Typography>
            <List className={classes.list}>
              {messages.map(({ messageId, message, user }) => (
                <Fragment key={messageId}>
                  <ListItem className={classes.listItem}>
                    <ListItemText primary={`${user.name}:`} className={classes.userName} />
                    <ListItemText secondary={message} className={classes.messageText} />
                  </ListItem>
                </Fragment>
              ))}
              <div ref={this.messagesEnd} />
            </List>
          </Paper>
          <form className={classes.messageForm} onSubmit={this.handleSubmit}>
            <TextField
              id="filled-textarea"
              multiline
              className={classes.textField}
              margin="normal"
              variant="filled"
              value={inputMsg}
              onChange={this.handleChange}
            />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              SEND
            </Button>
          </form>
        </React.Fragment>
      </div>
    );
  }
}

Chatroom.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      messageId: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired
    })
  ),
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  selectedChatroom: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }),
  sendMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Chatroom);
