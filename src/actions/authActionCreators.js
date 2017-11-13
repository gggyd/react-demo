import fetch from 'isomorphic-fetch';
import RequestModul from '../api/requesModul';

export const TOGGLE_AUTH_STATE = 'TOGGLE_AUTH_STATE';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';  

const request = new RequestModul();

let AuthActionCreators = {
  toggleAuthState() {
    return {
      type: TOGGLE_AUTH_STATE
    };
  },

  login({ userName = 'admin', password='admin' }) {
    return (dispatch) => {
      dispatch({ type: REQUEST_LOGIN });

      let data = new FormData();
      data.append('username', userName);
      data.append('password', password);

      return request.postWithFormData({
        path: '/user/login',
        method: 'POST',
        body: data
      })
        .then(json => dispatch({
          type: RECEIVE_LOGIN,
          data: json.data
        }));
    }
  }
}

export default AuthActionCreators;