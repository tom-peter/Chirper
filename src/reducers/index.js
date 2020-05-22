import { combineReducers } from 'redux';
import authedUser from '../reducers/authedUser';
import users from '../reducers/users';
import tweets from '../reducers/tweets';

// Combine tweets, users and authedUser reducer into one main, root reducer, 
// since the `createStore` function only accepts a single reducer
export default combineReducers({
  authedUser,
  users,
  tweets
});
