import React, { Component } from 'react';
import { connect } from 'react-redux';
import authActionCreators from '../actions/authActionCreators';
import AboutActionCreators from '../actions/aboutActionCreators';
import './about.css';

class About extends Component {
  state = {

  }

  render() {
    return (
      <div>
        <p>About...</p>
        <p>About...</p>
        <p>About...</p>
        <p>About...</p>
        <p>About...</p>
        <p>About...</p>
        <p>About...</p>
        <p>About...</p>
        <button
          onClick={this.props.toggleAuthenticated.bind(this)} >
          Logout
        </button>
        <button 
          onClick={this.props.getUserInfo.bind(this)}>
          Get User Info
        </button>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  authState: state.auth,
  aboutState: state.about
});

const mapDispatchToProps = (dispatch) => ({
  toggleAuthenticated: () => (dispatch(authActionCreators.toggleAuthState())),
  getUserInfo: () => (dispatch(AboutActionCreators.getUserInfo()))
});

export default connect(mapStateToProps, mapDispatchToProps)(About);