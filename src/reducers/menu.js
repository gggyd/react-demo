import { 
  REQUEST_MENU,
  RECEIVE_MENU
} from '../actions/menuActionCreators';

import { combineReducers } from 'redux';

let InitialData = {
  menu: []
};

const menuState = (state = InitialData, action ) => {
  switch (action.type) {
    case RECEIVE_MENU:
      return Object.assign({}, state, { menu: action.data });
    default:
      return state
  }
}

export default combineReducers({
  menuState
});