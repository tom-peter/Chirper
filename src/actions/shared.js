import { getInitialData } from '../utils/api';

// import action creators
import { receiveUsers } from '../actions/users';
import { receiveTweets } from '../actions/tweets';
import { setAuthedUser } from '../actions/authedUser';

// import loading bar
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = 'johndoe';

// handle initial data with redux-thunk pattern, because we want to make an async request
export function handleInitialData() {	
  return dispatch => {
		// show loading bar
		dispatch(showLoading());
		
    return getInitialData()
		.then(({ users, tweets }) => {
		  console.log(tweets, users);
		  
		  // take users and tweets and add them to the redux store
		  dispatch(receiveUsers(users));
		  dispatch(receiveTweets(tweets));
			dispatch(setAuthedUser(AUTHED_ID));
			
			// hide loading bar
      dispatch(hideLoading());
		});
  };
}