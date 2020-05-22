import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

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

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
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

// async action creator to handle add new tweet to database
export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    // loading bar is used - show here, hide at the end
    dispatch(showLoading());

    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
      .then(tweet => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()));
  };
}
