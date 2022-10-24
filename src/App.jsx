import React from 'react';
import { ImageComponent } from './components/ImageComponent/ImageComponent';
import { CounterComponent } from './components/CounterComponent/CounterComponent';
import { TranslationBlockComponent } from './components/TranslationBlockComponent/TranslationBlockComponent';

import './App.scss';

export const App = () => {
  return (
    <div className="app">
      <ImageComponent />
      <CounterComponent />
      <TranslationBlockComponent />
    </div>
  );
};
