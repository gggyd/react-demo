import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import { connect } from 'react-redux';
import App from './App';
import Login from './containers/login';
import About from './containers/about';

const mapStateToProps = (state) => ({
  authState: state.auth
});

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route {...rest} render={props => (
    authenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
);

const RouterComponent = (props) => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <PrivateRoute authenticated={props.authState.AuthState.authenticated} path="/about" component={About} />
    </div>
  </Router>
);

export default connect(mapStateToProps)(RouterComponent);