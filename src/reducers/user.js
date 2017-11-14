import { combineReducers } from 'redux';
import {
  RECEIVE_ADMIN_USER_LIST
} from '../actions/userActionCreators';

let initialData = {
  list: { }
}

const list = (state = initialData.list, action) => {
  switch (action.type) {
    case RECEIVE_ADMIN_USER_LIST:
      return action.data;
    default:
      return state;
  }
}

export default combineReducers({
  list
});