import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AvailableUsers from './container/AvailableUsers';
import Chatrooms from './container/ChatroomsContainer';
import Chatroom from './container/ChatroomContainer';
import TopBar from './component/TopBar';
import WrapperContainer from './container/WrapperContainer';
import store from './store';

const styles = {
  container: {
    height: '100vh',
    overflow: 'hidden'
  },
  center: {
    maxWidth: '600px',
    height: '90%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden'
  }
};

const App = ({ classes }) => (
  <Provider store={store}>
    <Router>
      <div className={classes.container}>
        <TopBar />
        <div className={classes.center}>
          <WrapperContainer>
            <Switch>
              <Route exact path="/" component={AvailableUsers} />
              <Route path="/chatrooms" component={Chatrooms} />
              <Route path="/chatroom" component={Chatroom} />
              <Route component={AvailableUsers} />
            </Switch>
          </WrapperContainer>
        </div>
      </div>
    </Router>
  </Provider>
);
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
