import {
  REQUEST_SERVER_LIST,
  RECEIVE_SERVER_LIST
} from '../../../actions/admin/resource/serverActionCreators'
import { combineReducers } from 'redux'

const initialData = {
  listAndPagination: {

  }
}

let listAndPagination = (state = initialData.listAndPagination, action) => {
  switch (action.type) {
    case RECEIVE_SERVER_LIST:
      return action.data
      break
    default:
      return state
      break
  }
}

let server = combineReducers({
  listAndPagination
})

export default server