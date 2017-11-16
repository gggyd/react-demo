import { 
  TOGGLE_AUTH_STATE,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  AUTH_LOGOUT
} from '../actions/authActionCreators';

import uInfoUtils from '../utils/uInfo';

let AuthInitialData = {
  authenticated: uInfoUtils.getUInfo() || false
};

const AuthState = (state = AuthInitialData, action) => {
  switch (action.type) {
    case TOGGLE_AUTH_STATE:
      uInfoUtils.setUInfo(!state.authenticated);
      return Object.assign({}, state, {
        authenticated: !state.authenticated
      });
    case RECEIVE_LOGIN:
      let authenticated = false;
      if (action.data) {
        authenticated = true;
      }

      localStorage.setItem('userInfo', JSON.stringify(action.data));
      uInfoUtils.setUInfo(authenticated);
      return Object.assign({}, state, {
        authenticated: authenticated
      });
    case  AUTH_LOGOUT:
      uInfoUtils.setUInfo(false);
      return Object.assign({}, state, {
        authenticated: false
      });
    default:
      return state;
  }
};

export default AuthState