/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wordsRemain: undefined,
};

export const wordsRemainSlice = createSlice({
  name: 'wordsRemain',
  initialState,
  reducers: {
    set__wordsRemain(state, action) {
      state.wordsRemain = action.payload;
    },
  },
});

export default wordsRemainSlice.reducer;
