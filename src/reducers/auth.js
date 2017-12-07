import { 
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  AUTH_LOGOUT,
  CHANGE_AUTH_INFO
} from '../actions/authActionCreators'

import uInfoUtils from '../utils/uInfo'

let AuthInitialData = {
  authenticated: uInfoUtils.getUserInfo() ? true : false,
  userInfo: uInfoUtils.getUserInfo() || { }
}

const AuthState = (state = AuthInitialData, action) => {
  switch (action.type) {
    case RECEIVE_LOGIN:
      let authenticated = false
      let userInfo = action.data
      if (!!userInfo && !!userInfo.username && userInfo.state === 1) {
        authenticated = true
        uInfoUtils.setUserInfo(userInfo)
      }
      
      return { ...state, ...{
        authenticated,
        userInfo
      } };
    case AUTH_LOGOUT:
      uInfoUtils.removeUserInfo();
      
      return { ...state, ...{
        authenticated: false,
        userInfo: { }
      } };
    case CHANGE_AUTH_INFO:
      return { ...state, ...action.data }
    default:
      return state
  }
};

export default AuthState