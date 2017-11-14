import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './reducers/auth';
import about from './reducers/about';
import menu from './reducers/menu';
import user from './reducers/user';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

const reducers = combineReducers({
  auth,
  about,
  menu,
  user
});

const store = createStore(
  reducers, 
  applyMiddleware(logger, thunk)
);

export default store;