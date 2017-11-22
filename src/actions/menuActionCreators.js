import menuService from '../api/services/menu'

export const REQUEST_MENU = 'REQUEST_MENU'
export const RECEIVE_MENU = 'RECEIVE_MENU'

let MenuActionCreators = {
  getMenu() {
    return (dispatch) => {
      dispatch({type: REQUEST_MENU})
      
      menuService.getMenu()
        .then(json => {
          return dispatch({
            type: RECEIVE_MENU,
            data: json.data
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

export default MenuActionCreators