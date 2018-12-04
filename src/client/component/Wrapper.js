import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as R from 'ramda';

const styles = {
  wrapper: {
    height: '100%'
  }
};

class Wrapper extends React.Component {
  componentDidMount() {
    const { selectedUser, selectedChatroom, refreshPage } = this.props;
    const isNotNil = R.complement(R.isNil);
    const getId = R.prop('id');
    const data = {
      userId: getId(selectedUser),
      chatroomId: getId(selectedChatroom)
    };
    if (isNotNil(data.userId) || isNotNil(data.chatroomId)) {
      refreshPage(data);
    }
  }

  render() {
    const { children, classes } = this.props;
    return <div className={classes.wrapper}>{children}</div>;
  }
}

Wrapper.propTypes = {
  children: PropTypes.object,
  selectedChatroom: PropTypes.object,
  selectedUser: PropTypes.object,
  classes: PropTypes.object.isRequired,
  refreshPage: PropTypes.func.isRequired
};

export default withStyles(styles)(Wrapper);
