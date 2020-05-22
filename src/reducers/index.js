import { combineReducers } from 'redux';
import authedUser from '../reducers/authedUser';
import users from '../reducers/users';
import tweets from '../reducers/tweets';
import { loadingBarReducer } from 'react-redux-loading';

// Combine tweets, users and authedUser reducer into one main, root reducer, 
// since the `createStore` function only accepts a single reducer
// add loadingBar in the root reducer
export default combineReducers({
  authedUser,
  users,
  tweets,
  loadingBar: loadingBarReducer
});
