import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { counterSlice } from '../../store/counterReducer';

export const StatisticsComponent = () => {
  const dispatch = useDispatch();
  const { set__bestScore } = counterSlice.actions;
  const { wordsRemain } = useSelector(state => state.wordsRemainReducer);
  const { bestScore } = useSelector(state => state.counterReducer);

  useEffect(() => {
    const currBestScore = localStorage.getItem('bestScore');

    dispatch(set__bestScore(currBestScore));
  }, []);

  return (
    <div className="app__statistics statistics">
      <p>
        Unique words left:
        &nbsp;
        {wordsRemain}
      </p>
      <p>
        Best score:
        &nbsp;
        {bestScore}
      </p>
    </div>
  );
};
