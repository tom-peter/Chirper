import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets';

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
      // add new tweet
      case ADD_TWEET:
        const { tweet } = action;
  
        let replyingTo = {};
        // if the user is replying to a tweet - add the id of this tweet to the parent tweet
        if (tweet.replyingTo !== null) {
          replyingTo = {
            [tweet.replyingTo]: {
              ...state[tweet.replyingTo],
              replies: state[tweet.replyingTo].replies.concat([tweet.id])
            }
          };
        }
        return {
          ...state,
          [tweet.id]: tweet,
          ...replyingTo
        };

    default:
      return state;
  }
}