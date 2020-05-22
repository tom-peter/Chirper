import { getInitialData } from '../utils/api';

// Import action creators
import { receiveUsers } from '../actions/users';
import { receiveTweets } from '../actions/tweets';
import { setAuthedUser } from '../actions/authedUser';

const AUTHED_ID = 'johndoe';

// handle initial data with redux-thunk pattern, because we want to make an async request
export function handleInitialData() {	
  return dispatch => {
    return getInitialData()
		.then(({ users, tweets }) => {
		  console.log(tweets, users);
		  
		  // take users and tweets and add them to the redux store
		  dispatch(receiveUsers(users));
		  dispatch(receiveTweets(tweets));
		  dispatch(setAuthedUser(AUTHED_ID));
		});
  };
}