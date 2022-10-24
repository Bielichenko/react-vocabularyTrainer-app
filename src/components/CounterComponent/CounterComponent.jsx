import React from 'react';
import { useSelector } from 'react-redux';

export const CounterComponent = () => {
  const { counter } = useSelector(state => state.counterReducer);

  return (
    <div className="app__counter counter">
      {counter}
    </div>
  );
};
