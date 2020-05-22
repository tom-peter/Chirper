export const RECEIVE_USERS = 'RECEIVE_USERS';

// Action creators
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}
