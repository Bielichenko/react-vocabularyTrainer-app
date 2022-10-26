/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAppStarted: false,
  isInitalWordSet: false,
};

export const isAppStartedSlice = createSlice({
  name: 'isAppStarted',
  initialState,
  reducers: {
    start__app(state) {
      state.isAppStarted = true;
    },
    set__initialWord(state) {
      state.isInitalWordSet = true;
    },
  },
});

export default isAppStartedSlice.reducer;
