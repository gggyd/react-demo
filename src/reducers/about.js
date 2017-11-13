import {
  REQUEST_USER_INFO,
  RECEIVE_USER_INFO
} from '../actions/aboutActionCreators';
import { combineReducers } from 'redux';

let defaultData = {
  userInfo: { }
};

const UserInfoState = (
  state = defaultData,
  action
) => {
  switch (action.type) {
    case RECEIVE_USER_INFO:
      return Object.assign({ }, state, action.data);
    default:
      return state;
  }
}

export default combineReducers({UserInfoState});