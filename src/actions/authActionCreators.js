import userService from '../api/services/user'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const CHANGE_AUTH_INFO = 'CHANGE_AUTH_INFO'


let AuthActionCreators = {
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
        }))
    }
  },

  logout() {
    return (dispatch) => {
      dispatch({
        type: AUTH_LOGOUT
      });

      userService.logout()
        .then(json => {
          console.log('logout', json)
        })
    }
  },

  changeAuthInfo({rdsId}) {
    return {
      type: CHANGE_AUTH_INFO,
      data: {
        rdsId
      }
    }
  }
}

export default AuthActionCreators;