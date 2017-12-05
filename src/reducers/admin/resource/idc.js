import {
  REQUEST_IDC_LIST,
  RECEIVE_IDC_LIST,
  RECEIVE_IDC_DROPDOWN_LIST,
  SELECTED_ITEM,
  SET_IDC_LIST
} from '../../../actions/admin/resource/idcActionCreators'
import { combineReducers } from 'redux'

const initialData = {
  listAndPagination: { },
  selectedItem: { }
}

let listAndPagination = (state = initialData.listAndPagination, action) => {
  switch (action.type) {
    case RECEIVE_IDC_LIST:
      return action.data
    case SET_IDC_LIST:
      return Object.assign({ }, state, {items: action.data})
    default:
      return state
  }
}

let dropdownList = (state = [ ], action) => {
  switch (action.type) {
    case RECEIVE_IDC_DROPDOWN_LIST:
      return action.data
    default:
      return state
  }
}

let selectedItem = (state = initialData.selectedItem, action) => {
  switch (action.type) {
    case SELECTED_ITEM:
      return { ...state, ...action.data }
    default:
      return state
  }
}

export default combineReducers({
  listAndPagination,
  dropdownList,
  selectedItem
})