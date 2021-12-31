// ** Redux Imports
import {combineReducers} from 'redux';
import auth from '@features/authentication/store';
import themes from '@lib/themes/store';

export const rootReducer = combineReducers({
  themes,
  auth,
});
