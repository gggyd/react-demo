import userService from '../api/services/user'
export const TOGGLE_AUTH_STATE = 'TOGGLE_AUTH_STATE'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'



let AuthActionCreators = {
  toggleAuthState() {
    return {
      type: TOGGLE_AUTH_STATE
    };
  },

  login({ userName, password }) {
    return (dispatch) => {
      dispatch({ type: REQUEST_LOGIN });

      let data = new FormData();
      data.append('username', userName);
      data.append('password', password);

      userService.login(data)
        .then(json => dispatch({
          type: RECEIVE_LOGIN,
          data: json.data
        }));
    }
  },

  logout() {
    return {
      type: AUTH_LOGOUT
    };
  }
}

export default AuthActionCreators;