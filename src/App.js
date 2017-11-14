import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import './style/index.css';

class App extends Component {
  render() {
    return (
      <div>
        app page...
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authState: state.auth
});

export default connect(mapStateToProps)(App);
