import RequestModul from '../api/requesModul';
export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';

let request = new RequestModul();

let AboutActionCreators = {
  getUserInfo() {
    return (dispatch) => {
      dispatch({type: REQUEST_USER_INFO});
      request.get({
        path: '/user/admin/userinfo?p=1&pz=10',
        method: 'GET'
      })
        .then(json => {
          return dispatch({
            type: RECEIVE_USER_INFO,
            data: json.data
          })
        })
    }
  }
}

export default AboutActionCreators;
