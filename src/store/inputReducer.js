/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInput: '',
};

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    set__userInput(state, action) {
      state.userInput = action.payload;
    },
    drop__userInput(state) {
      state.userInput = '';
    },
  },
});

export default inputSlice.reducer;
