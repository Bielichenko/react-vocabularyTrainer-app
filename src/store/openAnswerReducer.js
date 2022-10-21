/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAnswerOpen: false,
};

export const openAnswerSlice = createSlice({
  name: 'openAnswer',
  initialState,
  reducers: {
    show__answer(state) {
      state.isAnswerOpen = true;
    },
    hide__answer(state) {
      state.isAnswerOpen = false;
    },
  },
});

export default openAnswerSlice.reducer;
