import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, username }) => (
  <li>
    {username}
:
    {message}
  </li>
);
Message.propTypes = {
  message: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
export default Message;
