import { combineReducers } from 'redux';
import signIn from './sign-in/slice';
import signOut from './sign-out/slice';
import signUp from './sign-up/slice';
import user from './user/slice';

export default combineReducers({
  signIn,
  signUp,
  signOut,
  user
});
