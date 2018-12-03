import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const styles = {
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0abab5'
  },
  topbar: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  homeButton: {
    marginRight: 100
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  }
};

function TopBar(props) {
  const { classes } = props;
  return (
    <div className={classes.topbar}>
      <AppBar position="static" className={classes.box}>
        <Toolbar>
          <IconButton className={classes.homeButton} color="inherit" aria-label="Home">
            <Link to="/" className={classes.link}>
              <HomeIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to="/chatrooms" className={classes.link}>
              Chatrooms
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopBar);
