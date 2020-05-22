import { RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets';

// Reducer - specify _how_ the application's state changes 
// in response to actions sent to the store
export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      };
    // add or remove the username to the likes array	
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes:
            action.hasLiked === true
              ? state[action.id].likes.filter(uid => uid !== action.authedUser)
              : state[action.id].likes.concat([action.authedUser])
        }
      };
    default:
      return state;
  }
}