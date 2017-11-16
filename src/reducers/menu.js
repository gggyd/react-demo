import { 
  REQUEST_MENU,
  RECEIVE_MENU
} from '../actions/menuActionCreators';

let InitialData = {
  list: []
};

const menuState = (state = InitialData, action ) => {
  switch (action.type) {
    case RECEIVE_MENU:
      return Object.assign({}, state, { list: action.data });
    default:
      return state
  }
}

export default menuState