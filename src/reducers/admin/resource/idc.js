import {
  REQUEST_IDC_LIST,
  RECEIVE_IDC_LIST
} from '../../../actions/admin/resource/idcActionCreators'
import { combineReducers } from 'redux'

const initialData = {
  listAndPagination: { }
}

let listAndPagination = (state = initialData.listAndPagination, action) => {
  switch (action.type) {
    case RECEIVE_IDC_LIST:
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  listAndPagination
})