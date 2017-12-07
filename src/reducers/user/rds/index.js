import { combineReducers } from 'redux'
import {
  RECEIVE_RDS_MENU_LIST
} from '../../../actions/user/rdsActionCreators'

const initialData = {
  menuList: [ ]
}

let menuList = (state = initialData.menuList, action) => {
  switch (action.type) {
    case RECEIVE_RDS_MENU_LIST:
      return [...[], ...action.data]
    default:
      return state
  }
}

export default combineReducers({
  menuList
})