import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
import Nav from './Nav';

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
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/tweet/:id" component={TweetPage} />
                <Route path="/new" component={NewTweet} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
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
