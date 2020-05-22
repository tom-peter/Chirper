import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { handleToggleTweet } from '../actions/tweets';

// import icons
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline
} from 'react-icons/ti/index';

export class Tweet extends Component {

  handleLike = e => {
    e.preventDefault();
    const { dispatch, tweet, authedUser } = this.props;
    dispatch(
      handleToggleTweet({
      id: tweet.id,
      authedUser,
      hasLiked: tweet.hasLiked
      })
    );
  };
  
  toParent = (e, id) => {
    e.preventDefault();
    // redirect to the parent tweet
    this.props.history.push(`/tweet/${id}`);
  };

  render() {
    const { tweet, id } = this.props;
	
    if (tweet === null) {
      return <p>This tweet doesn't exist</p>;
    }
	
  	// destructuring the needed properties
    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      parent
    } = tweet;

    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
		
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={e => this.toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
		  
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
			
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
			
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
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

// wrap the export in withRouter, which will pass our connected component 
// (which will pass our Tweet component) to the Router props
// which allows us to use this.props.history.push
export default withRouter(connect(mapStateToProps)(Tweet));
