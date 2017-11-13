import { 
  TOGGLE_AUTH_STATE,
  REQUEST_LOGIN,
  RECEIVE_LOGIN
} from '../actions/authActionCreators';

import { combineReducers } from 'redux';
import uInfoUtils from '../utils/uInfo';

let AuthInitialData = {
  authenticated: uInfoUtils.getUInfo() || false
};

const AuthState = (state = AuthInitialData, action) => {
  switch (action.type) {
    case TOGGLE_AUTH_STATE:
      // localStorage.setItem('uInfo', JSON.stringify(!state.authenticated));
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
    default:
      return state;
  }
};

export default combineReducers({
  AuthState
});