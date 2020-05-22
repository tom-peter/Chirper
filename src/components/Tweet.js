import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet } from '../utils/helpers';

export class Tweet extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="tweet">
        <h3>tweet</h3>
      </div>
    );
  }
}

// beside the (1st arg) store state, the 2. arg `ownProps` will be an object with { id }
function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];

  // if the tweet has a replyingTo property, then it has a parent tweet
  // use ternary conditionals in case a tweet doesn't exit
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  // add parentTweet in formatTweet	
  // use ternary conditionals in case a tweet doesn't exit
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  }
}

export default connect(mapStateToProps)(Tweet);
