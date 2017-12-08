import { combineReducers } from 'redux'

import { 
  REQUEST_RDS_CHART_PERFORMANCE,
  RECEIVE_RDS_CHART_PERFORMANCE
} from '../../../../actions/user/monitor/rdschartActionCreators'

const initialData = {
  performance: [ ]
}

let performance = (state = initialData.performance, action ) => {
  switch (action.type) {
    case RECEIVE_RDS_CHART_PERFORMANCE:
    return [].concat(action.data)
  default:
    return state
  }
}

export default combineReducers({
  performance
}) 