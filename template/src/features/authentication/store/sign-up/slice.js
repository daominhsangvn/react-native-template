import {createAsyncThunk, createSlice, createSelector} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THUNK_STATUS} from '@configs/constants';
import {DataService} from '@lib/data/dataService';

const name = 'signUp';
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

export const signUpAction = createAsyncThunk(
  `${name}/signup`,
  async ({email, password}) => {
    const data = await DataService.register({email, password});
    return {token: data.accessToken};
  },
);

const slice = createSlice({
  name,
  initialState,
  extraReducers: {
    [signUpAction.pending]: (state, action) => {
      state.status = THUNK_STATUS.LOADING;
      state.error = null;
    },
    [signUpAction.fulfilled]: (state, action) => {
      state.status = THUNK_STATUS.SUCCEEDED;
    },
    [signUpAction.rejected]: (state, action) => {
      state.status = THUNK_STATUS.FAILED;
      state.error = action.error.message;
    },
  },
});

export const selectIsLoading = createSelector(
  selector,
  state => state.status === THUNK_STATUS.LOADING,
);
export const selectIsError = createSelector(selector, state => !!state.error);
export const selectError = createSelector(selector, state => state.error);

export default persistReducer(persistConfig, slice.reducer);
