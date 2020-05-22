import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

class App extends Component {
  
  componentDidMount() {
	  // invoke handleInitialData action creator to get initial data
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        Starter Code
      </div>
    )
  }
}

export default connect()(App);
