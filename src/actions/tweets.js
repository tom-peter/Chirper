export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';

// Action creators
export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  };
}
