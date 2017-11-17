import { 
  TOGGLE_AUTH_STATE,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  AUTH_LOGOUT
} from '../actions/authActionCreators'

import uInfoUtils from '../utils/uInfo'

let AuthInitialData = {
  authenticated: uInfoUtils.getUserInfo() || false
}

const AuthState = (state = AuthInitialData, action) => {
  switch (action.type) {
    case TOGGLE_AUTH_STATE:
      uInfoUtils.setUInfo(!state.authenticated);
      return Object.assign({}, state, {
        authenticated: !state.authenticated
      });
    case RECEIVE_LOGIN:
      let authenticated = false
      if (!!action.data && !!action.data.username && action.data.state === 1) {
        authenticated = true
        uInfoUtils.setUserInfo(JSON.stringify(action.data))
      }
      
      return Object.assign({}, state, {
        authenticated: authenticated
      });
    case  AUTH_LOGOUT:
      uInfoUtils.removeUserInfo();
      
      return Object.assign({}, state, {
        authenticated: false
      });
    default:
      return state
  }
};

export default AuthState