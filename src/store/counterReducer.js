/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  counter: 0,
  bestScore: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment__counter(state) {
      state.counter += 1;
    },
    drop__counter(state) {
      state.counter = 0;
    },
    set__bestScore(state, action) {
      state.bestScore = action.payload;
    },
  },
});

export default counterSlice.reducer;
