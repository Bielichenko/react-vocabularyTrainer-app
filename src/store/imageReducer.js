/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: '',
  image: null,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    imageFetching(state) {
      state.isLoading = true;
    },
    imageFetchingSuccess(state, action) {
      state.isLoading = false;
      state.error = '';
      state.image = action.payload;
    },
    imageFetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    hide__image(state) {
      state.image = null;
    },
  },
});

export default imageSlice.reducer;
