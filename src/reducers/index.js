import { combineReducers } from 'redux'
import auth from './auth'
import menu from './menu'
import user from './user'

export default combineReducers({
  auth,
  menu,
  user
})