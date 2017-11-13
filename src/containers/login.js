import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import authActionCreators from '../actions/authActionCreators';

class Login extends Component {
  state = {
    isLogin: false
  }

  onLogin = function() {
    this.props.login({userName: 'admin', password: 'admin'});
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.authState.AuthState.authenticated) {
      return (
        <Redirect to={from}/>
      )
    }

    return (this.props.authState.AuthState.authenticated ? 
    <div>Logon</div>
    : <div>
      <button
        onClick={this.onLogin.bind(this)}
       >Login</button>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  authState: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  toggleAuthenticated: () => dispatch(authActionCreators.toggleAuthState()),
  login: ({userName, password}) => dispatch(authActionCreators.login({userName, password}))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));