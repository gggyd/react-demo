import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends React.Component {
  ComponentDidMount() {

  }

  render() {
    let { component: Component, authenticated, ...rest } = this.props;
    return (
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
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.AuthState.authenticated
});

export default connect(mapStateToProps)(PrivateRoute);