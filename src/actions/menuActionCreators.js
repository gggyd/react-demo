import RequestModul from '../api/requesModul';
const request = new RequestModul();

export const REQUEST_MENU = 'REQUEST_MENU';
export const RECEIVE_MENU = 'RECEIVE_MENU';

let MenuActionCreators = {
  getMenu() {
    return (dispatch) => {
      dispatch({type: REQUEST_MENU});
      request.get({
        path: '/user/menu',
        method: 'GET'
      })
        .then(json => {
          return dispatch({
            type: RECEIVE_MENU,
            data: json.data
          })
        })
    }
  }
}

export default MenuActionCreators;