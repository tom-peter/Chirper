import { RECEIVE_TWEETS } from '../actions/tweets';

// Reducer - specify _how_ the application's state changes 
// in response to actions sent to the store
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      };
    default:
      return state;
  }
}