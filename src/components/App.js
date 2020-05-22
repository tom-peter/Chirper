import React, { Component } from 'react'
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';

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
        {this.props.loading === true ? null : <Dashboard />}
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
