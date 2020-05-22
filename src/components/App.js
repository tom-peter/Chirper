import React, { Component } from 'react'
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';

class App extends Component {
  
  componentDidMount() {
	  // invoke handleInitialData action creator to get initial data
    this.props.dispatch(handleInitialData());
  }

  // only render the Dashboard, once the initial data has been loaded
  // (invocation of handleInitialData has been finished)
  // render LoadingBar
  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : 
          <TweetPage match={{ params: { id: 'hbsc73kzqi75rg7v1e0i6a' } }} />
        }
      </div>
    )  
  }
}

// set loading for the render check: if authedUser === null, return loading = true
function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
