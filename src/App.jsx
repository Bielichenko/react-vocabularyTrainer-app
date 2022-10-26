import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAppStartedSlice } from './store/isAppStartedReducer';
import { WordsStorageComponent } from './components/StatisticsComponent/StatisticsComponent';
import { ImageComponent } from './components/ImageComponent/ImageComponent';
import { CounterComponent } from './components/CounterComponent/CounterComponent';
import { TranslationBlockComponent } from './components/TranslationBlockComponent/TranslationBlockComponent';
import { StartAppComponent } from './components/StartAppComponent/StartAppComponent';

import './App.scss';
import { isLocalStorageSet } from './utils/functions';

export const App = () => {
  const dispatch = useDispatch();
  const { isAppStarted } = useSelector(state => state.isAppStartedReducer);
  const { start__app } = isAppStartedSlice.actions;

  useEffect(() => {
    if (isLocalStorageSet()) {
      dispatch(start__app());
    }
  }, []);

  return (
    <div className="app">
      {!isAppStarted
        ? <StartAppComponent />
        : (
          <>
            <WordsStorageComponent />
            <ImageComponent />
            <CounterComponent />
            <TranslationBlockComponent />
          </>
        )}
    </div>
  );
};
