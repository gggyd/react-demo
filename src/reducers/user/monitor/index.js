import { combineReducers } from 'redux'

import rdschart from './rdschart'
import topo from './topo'

export default combineReducers({
  rdschart,
  topo
})