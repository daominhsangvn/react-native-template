import {createSelector, createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const name = 'themes';
const whitelist = ['auto', 'scheme'];
const selector = state => state[name];
const initialState = {
  auto: false,
  scheme: 'light',
};

const persistConfig = {
  key: name,
  whitelist,
  storage: AsyncStorage,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setScheme(state, action) {
      state.scheme = action.payload.scheme;
    },
    setAutoScheme(state, action) {
      state.auto = action.payload.auto;
    },
    toggleScheme(state, action) {
      state.scheme = state.scheme === 'dark' ? 'light' : 'dark';
    },
  },
});
export const {setScheme, setAutoScheme, toggleScheme} = slice.actions;
export const selectIsThemeAuto = createSelector(selector, state => state.auto);
export const selectThemeScheme = createSelector(
  selector,
  state => state.scheme,
);

export default persistReducer(persistConfig, slice.reducer);
