import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';
import inputReducer from './inputReducer';
import openAnswerReducer from './openAnswerReducer';
import imageReducer from './imageReducer';
import wordsRemainReducer from './wordsRemainReducer';
import isAppStartedReducer from './isAppStartedReducer';

const rootReducer = combineReducers({
  counterReducer,
  inputReducer,
  openAnswerReducer,
  imageReducer,
  wordsRemainReducer,
  isAppStartedReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
