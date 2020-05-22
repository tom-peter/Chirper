import { saveLikeToggle } from '../utils/api';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

// Action creators
export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  };
}

function toggleTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  };
}

// async action creator, responsible for dispatching toggleTweet and 
// saving the info to the database by calling saveLikeToggle function
export function handleToggleTweet(info) {
  return dispatch => {
    dispatch(toggleTweet(info));

    return saveLikeToggle(info).catch(e => {
      console.warn('Error in handleToggleTweet:', e);
	  // reset the toggle in case of error
      dispatch(toggleTweet(info));
      alert('There was an error liking the tweet. Try again.');
    });
  };
}
