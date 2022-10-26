import React from 'react';
import { useDispatch } from 'react-redux';
import { isAppStartedSlice } from '../../store/isAppStartedReducer';
import { wordsRemainSlice } from '../../store/wordsRemainReducer';
import { wordsFirstPack } from '../../wordsPacks/wordsFirstPack';

export const StartAppComponent = () => {
  const dispatch = useDispatch();
  const { set__wordsRemain } = wordsRemainSlice.actions;
  const { start__app } = isAppStartedSlice.actions;

  const setLocalStorage = () => {
    const initialWordsRemain = wordsFirstPack.length;

    localStorage.setItem('wordsStorage', JSON.stringify(wordsFirstPack));
    localStorage.setItem('wordsRemain', JSON.stringify(initialWordsRemain));
    localStorage.setItem('bestScore', JSON.stringify(0));

    dispatch(set__wordsRemain(initialWordsRemain));
    dispatch(start__app());
  };

  return (
    <button
      type="button"
      className="app_startButton startButton"
      onClick={() => {
        setLocalStorage();
      }}
    >
      Start new vocabularay training!
    </button>
  );
};
