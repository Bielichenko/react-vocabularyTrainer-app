import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';
import inputReducer from './inputReducer';
import openAnswerReducer from './openAnswerReducer';

const rootReducer = combineReducers({
  counterReducer,
  inputReducer,
  openAnswerReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
