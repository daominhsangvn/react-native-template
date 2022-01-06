import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {THUNK_STATUS} from '@configs/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataService} from '@lib/data/dataService';

const name = 'signIn';
const whitelist = [];
const selector = state => state.auth[name];
const initialState = {
  status: THUNK_STATUS.IDLE,
  error: null,
};

const persistConfig = {
  key: name,
  whitelist,
  storage: AsyncStorage,
};

export const signInAction = createAsyncThunk(
  `${name}/signIn`,
  async ({email, password}) => {
    const data = await DataService.login({email, password});
    return {token: data.accessToken};
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
    [signInAction.pending]: (state, action) => {
      state.status = THUNK_STATUS.LOADING;
      state.error = null;
    },
    [signInAction.fulfilled]: (state, action) => {
      state.status = THUNK_STATUS.SUCCEEDED;
    },
    [signInAction.rejected]: (state, action) => {
      state.status = THUNK_STATUS.FAILED;
      state.error = action.error.message;
    },
  },
});
export const {reset} = slice.actions;
export const selectStatus = createSelector(selector, state => state.status);
export const selectIsLoading = createSelector(
  selector,
  state => state.status === THUNK_STATUS.LOADING,
);
export const selectIsSucceeded = createSelector(
  selector,
  state => state.status === THUNK_STATUS.SUCCEEDED,
);
export const selectIsFailed = createSelector(
  selector,
  state => state.status === THUNK_STATUS.FAILED,
);
export const selectError = createSelector(selector, state => state.error);

export default persistReducer(persistConfig, slice.reducer);
