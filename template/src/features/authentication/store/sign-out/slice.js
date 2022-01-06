import {createAsyncThunk, createSlice, createSelector} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THUNK_STATUS} from '@configs/constants';
import {DataService} from '@lib/data/dataService';

const name = 'signOut';
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

export const signOutAction = createAsyncThunk(`${name}/signOut`, async () => {
  await DataService.logOut();
});

const slice = createSlice({
  name,
  initialState,
  extraReducers: {
    [signOutAction.pending]: state => {
      state.status = THUNK_STATUS.LOADING;
    },
    [signOutAction.fulfilled]: state => {
      state.status = THUNK_STATUS.SUCCEEDED;
    },
    [signOutAction.rejected]: (state, action) => {
      state.status = THUNK_STATUS.IDLE;
      state.error = action.error.message;
    },
  },
});

export const selectIsLoading = createSelector(
  selector,
  state => state.status === THUNK_STATUS.LOADING,
);
export const selectError = createSelector(selector, state => state.error);

export default persistReducer(persistConfig, slice.reducer);
