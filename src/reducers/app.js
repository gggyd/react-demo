import {
  CHANGE_APP_THEME
} from '../actions/appActionCreators'
import { combineReducers } from 'redux'

const theme = (state = {}, action) => {
  switch(action.type) {
    case CHANGE_APP_THEME:
      return { ...state, ...action.data } 
    default:
      return state
  }
}

export default combineReducers({
  theme
}) 