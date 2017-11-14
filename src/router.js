import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import LayoutComponet from './Layout';
import Login from './containers/login';
import PrivateRoute from './privateRoute';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={LayoutComponet} />
        </Switch>
      </Router>
    )
  }
};

export default RouterComponent;