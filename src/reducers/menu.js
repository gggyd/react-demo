import { 
  REQUEST_MENU,
  RECEIVE_MENU
} from '../actions/menuActionCreators'
import menuMap from '../utils/menu-map'

let InitialData = {
  defaultOpenKeys: [],
  defaultSelectedKeys: [],
  list: []
};

const getMenuDefaultKeys = (data) => {
  let defaultOpenKeys = []
  let defaultSelectedKeys = []

  if (data.length === 0) {
    return {
      defaultOpenKeys,
      defaultSelectedKeys
    }
  }

  let first = data[0]
  if (first.children.length > 0) {
    let subFirst = first.children[0]
    defaultSelectedKeys = [subFirst.iconClass || subFirst.path]
    defaultOpenKeys = [first.iconClass || first.path]
  }
  defaultSelectedKeys = [first.iconClass || first.path]

  return {
    defaultOpenKeys,
    defaultSelectedKeys
  }
}

const getMenuDefaultKeysByPathname = (pathname) => {
  let defaultOpenKeys = []
  let defaultSelectedKeys = []

  let menuMapItem = menuMap.find((item) => (
    item.pathname === pathname
  ))

  if (!menuMapItem) {
    return {
      defaultOpenKeys,
      defaultSelectedKeys
    }
  }

  defaultSelectedKeys = [menuMapItem.iconClass || menuMapItem.path]

  return {
    defaultOpenKeys,
    defaultSelectedKeys
  }
}

const menuState = (state = InitialData, action ) => {
  switch (action.type) {
    case RECEIVE_MENU:
      let menuDefaultKeys = []
      if (action.pathname && action.pathname !== '/') {
        menuDefaultKeys = getMenuDefaultKeysByPathname(action.pathname)
      } else {
        menuDefaultKeys = getMenuDefaultKeys(action.data)
      }

      return Object.assign({}, state, { list: action.data }, menuDefaultKeys)
    default:
      return state
  }
}

export default menuState