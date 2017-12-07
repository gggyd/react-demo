import menuService from '../api/services/menu'

export const REQUEST_MENU = 'REQUEST_MENU'
export const RECEIVE_MENU = 'RECEIVE_MENU'
export const CHANGE_MENU_DEFAULT = 'CHANGE_MENU_DEFAULT'

let MenuActionCreators = {
  getMenu(pathname) {
    return (dispatch) => {
      dispatch({type: REQUEST_MENU})
      
      menuService.getMenu()
        .then(json => {
          return dispatch({
            type: RECEIVE_MENU,
            data: json.data,
            pathname: pathname
          })
        })
    }
  },

  getUserMenu(pathname) {
    return (dispatch) => {
      dispatch({type: REQUEST_MENU})
      
      menuService.getUserMenu()
        .then(json => {
          return dispatch({
            type: RECEIVE_MENU,
            data: json.data,
            pathname: pathname
          })
        })
    }
  },

  changeMenuDefault({defaultOpenKeys = [], defaultSelectedKeys = []}) {
    return {
      type: CHANGE_MENU_DEFAULT,
      data: {
        defaultOpenKeys,
        defaultSelectedKeys
      }
    }
  }
}

export default MenuActionCreators