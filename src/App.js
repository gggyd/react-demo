import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './style/index.css';
import rds from './image/rds.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <img src={rds} alt=""/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authState: state.auth
});

export default withRouter(connect(mapStateToProps)(App));
