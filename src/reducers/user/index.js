import { combineReducers } from 'redux'

import rds from './rds'
import monitor from './monitor'

export default combineReducers({
  rds,
  monitor
})