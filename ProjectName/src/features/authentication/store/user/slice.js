import {THUNK_STATUS} from '@configs/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {signOutAction} from '../sign-out/slice';
import {signUpAction} from '../sign-up/slice';
import {signInAction} from '../sign-in/slice';
import {DataService} from '@lib/data/dataService';

const name = 'user';
const whitelist = ['token'];
const selector = state => state.auth[name];
const initialState = {
  token: null,
  user: null,
  status: THUNK_STATUS.IDLE,
};

const persistConfig = {
  key: name,
  whitelist,
  storage: AsyncStorage,
};

export const fetchProfile = createAsyncThunk(
  `${name}/fetchProfile`,
  async () => {
    const user = await DataService.getCurrentUser();
    return {user};
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    reset(state, action) {
      Object.keys(initialState).forEach(k => {
        state[k] = initialState[k];
      });
    },
  },
  extraReducers: {
    [signUpAction.fulfilled]: (state, action) => {
      // set token
      state.token = action.payload.token;
    },
    [signInAction.fulfilled]: (state, action) => {
      // set token
      state.token = action.payload.token;
    },
    [signOutAction.fulfilled]: (state, action) => {
      // reset
      Object.keys(initialState).forEach(k => {
        state[k] = initialState[k];
      });
    },
    [fetchProfile.pending]: (state, action) => {
      state.status = THUNK_STATUS.LOADING;
      state.error = null;
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.status = THUNK_STATUS.SUCCEEDED;
      state.user = action.payload.user;
    },
    [fetchProfile.rejected]: (state, action) => {
      state.status = THUNK_STATUS.FAILED;
      state.error = action.error.message;
    },
  },
});
export const {reset, setUser} = slice.actions;
export const selectToken = createSelector(selector, state => state.token);
export const selectUser = createSelector(selector, state => state.user);
export const selectIsLoading = createSelector(
  selector,
  state => state.status === THUNK_STATUS.LOADING,
);
export const selectIsAuth = createSelector(selector, state => !!state.token);

export default persistReducer(persistConfig, slice.reducer);
