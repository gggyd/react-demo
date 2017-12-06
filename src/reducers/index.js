import { combineReducers } from 'redux'
import auth from './auth'
import menu from './menu'
import user from './user'
import admin from './admin'
import app from './app'

export default combineReducers({
  auth,
  menu,
  user,
  admin,
  app
})