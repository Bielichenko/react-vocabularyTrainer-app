import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';
import inputReducer from './inputReducer';
import openAnswerReducer from './openAnswerReducer';
import imageReducer from './imageReducer';

const rootReducer = combineReducers({
  counterReducer,
  inputReducer,
  openAnswerReducer,
  imageReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
