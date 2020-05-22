import React from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';

class Dashboard extends React.Component {
  render() {
    const { tweetsIds } = this.props;
	
	  // rendering the Tweet component with ids
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul className="dashboard-list">
          {tweetsIds.map(id => (
            <li key={id}>
              <Tweet id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// mapStateToProps will take in the `tweets` slice of the state in the store 
// and it's gonna return an object with tweet ids sorted by timestamp
function mapStateToProps({ tweets }) {
  return {
    tweetsIds: Object.keys(tweets).sort(
      (a, b) => tweets[b].timestamp - tweets[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(Dashboard);
