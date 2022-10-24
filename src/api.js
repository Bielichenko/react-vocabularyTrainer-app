import { imageSlice } from './store/imageReducer';

const url = 'https://dog.ceo/api/breeds/image/random';

export const fetchImage = () => async (dispatch) => {
  try {
    dispatch(imageSlice.actions.imageFetching());

    const res = await fetch(url);
    const data = await res.json();

    dispatch(imageSlice.actions.imageFetchingSuccess(data));
  } catch (e) {
    dispatch(imageSlice.actions.imageFetchingError(e.message));
  }
};
