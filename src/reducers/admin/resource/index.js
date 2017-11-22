import { combineReducers } from 'redux'

import server from './server'
import idc from './idc'

export default combineReducers({
  server,
  idc
})