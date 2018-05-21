import {
  CHANGE_APP_THEME,
  CHANGE_APP_LANGUAGE
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

const language = (state = 'zh', action) => {
  switch(action.type) {
    case CHANGE_APP_LANGUAGE:
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  theme,
  language
}) 