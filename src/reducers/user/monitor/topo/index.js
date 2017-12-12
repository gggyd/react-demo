import { combineReducers } from 'redux'

import { 
  REQUEST_USER_TOPO,
  RECEIVE_USER_TOPO
} from '../../../../actions/user/monitor/topoActionCreators'

const initialData = {
  rds: { }
}

let rds = (state = initialData.rds, action ) => {
  switch (action.type) {
    case RECEIVE_USER_TOPO:
    return { ...state, ...action.data }
  default:
    return state
  }
}

export default combineReducers({
  rds
}) 