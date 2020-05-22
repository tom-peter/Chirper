import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';

class NewTweet extends Component {
  state = {
    text: ''
  };
  
  handleChange = e => {
    const text = e.target.value;

	// we are using react component's state here instead of redux's store,
	// since it's easier and the store wouldn't give any benefits here
    this.setState(() => ({
      text
    }));
  };
  
  handleSubmit = e => {
    e.preventDefault();

    const { text } = this.state;
    const { dispatch, id } = this.props;
	
	  dispatch(handleAddTweet(text, id));

	  // after submit, reset the text field into an empty string
    this.setState(() => ({
      text: ''
    }));
  };
  
  render() {
    const { text } = this.state;

    // TODO: Redirect if submitted

    const tweetLeft = 280 - text.length;

    return (
      <div>
        <h3 className="center">Compose new tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
          <button className="btn" type="submit" disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
