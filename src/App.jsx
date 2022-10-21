/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { counterSlice } from './store/counterReducer';
import { inputSlice } from './store/inputReducer';
import { openAnswerSlice } from './store/openAnswerReducer';
import { words } from './words';
import { fetchImage } from './api';

import './App.scss';

function getRandomWord() {
  const randomIndex = Math.round(Math.random() * words.length);

  return words[randomIndex];
}

let randomWord = getRandomWord();

function wordNormalize(word) {
  return word.trim().toLowerCase();
}

function makeFirstCapitalLetter(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

export const App = () => {
  const dispatch = useDispatch();
  const { counter } = useSelector(state => state.counterReducer);
  const { userInput } = useSelector(state => state.inputReducer);
  const { isAnswerOpen } = useSelector(state => state.openAnswerReducer);
  const { increment__counter } = counterSlice.actions;
  const { drop__counter } = counterSlice.actions;
  const { set__userInput } = inputSlice.actions;
  const { drop__userInput } = inputSlice.actions;
  const { show__answer } = openAnswerSlice.actions;
  const { hide__answer } = openAnswerSlice.actions;

  const wordsContainer = randomWord;
  const wordToTranslate = makeFirstCapitalLetter(wordsContainer[0]);
  const rightAnswer = makeFirstCapitalLetter(wordsContainer[1]);

  const [image, setImage] = useState(undefined);

  const setUserInput = (currInput) => {
    dispatch(set__userInput(currInput));
  };

  const setNewWord = () => {
    randomWord = getRandomWord();
    dispatch(drop__userInput());
  };

  const setImageFromServer = () => {
    if (counter !== 0 && (counter + 1) % 5 === 0) {
      fetchImage(setImage);
    }
  };

  const checkUserInput = () => {
    const normalizedInput = wordNormalize(userInput);
    const normalizedAnswer = wordNormalize(rightAnswer);

    if (normalizedInput === normalizedAnswer) {
      setImageFromServer();
      dispatch(increment__counter());
      setNewWord();
    }
  };

  const showAnswer = () => {
    dispatch(show__answer());
    dispatch(drop__counter());
    setImage(undefined);
  };

  const checkСorrectedInput = () => {
    const normalizedInput = wordNormalize(userInput);
    const normalizedAnswer = wordNormalize(rightAnswer);

    if (normalizedInput === normalizedAnswer) {
      setNewWord();
      dispatch(hide__answer());
    }
  };

  return (
    <div className="app">

      {
        !image
          ? (
            <div className="app__imgContainer imgContainer">
              <img
                className="app__image imgContainer__image"
                src="default-image.jpg"
                alt="defaultImg"
              />
            </div>
          )
          : (
            <div className="app__imgContainer imgContainer">
              <img
                className="app__image imgContainer__image"
                src={image.message}
                alt="dogImg"
              />
            </div>
          )
      }
      {
        !isAnswerOpen
          ? (
            <div className="app__mainSection mainSection">
              <div className="mainSection__transalationBlock">
                <div className="mainSection__wordAndAnswer">
                  <span className="mainSection__word">
                    {wordToTranslate}
                  </span>
                </div>
                <div className="mainSection__inputContainer">
                  <input
                    className="mainSection__input"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        checkUserInput();
                      }
                    }}
                  />
                </div>
                <div className="mainSection__buttonSection">
                  <button
                    className="mainSection__button mainSection__button--check"
                    type="button"
                    onClick={() => checkUserInput()}
                  >
                    check
                  </button>
                  <button
                    className="mainSection__button mainSection__button--open"
                    type="button"
                    onClick={() => showAnswer()}
                  >
                    I don&apos;t know
                  </button>
                </div>
              </div>
              <div className="mainSection__counterContainer">
                {counter}
              </div>
            </div>
          )
          : (
            <div className="app__mainSection mainSection">
              <div className="mainSection__transalationBlock">
                <div className="mainSection__wordAndAnswer">
                  <span className="mainSection__word">
                    {wordToTranslate}
                  </span>
                  <span className="mainSection__answer">
                    {rightAnswer}
                  </span>
                </div>
                <div className="mainSection__inputContainer">
                  <input
                    className="mainSection__input"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        checkСorrectedInput();
                      }
                    }}
                  />
                </div>
                <div className="mainSection__buttonSection">
                  <button
                    className="mainSection__button mainSection__button--check"
                    type="button"
                    onClick={() => checkСorrectedInput()}
                  >
                    Got it!
                  </button>
                </div>
              </div>
              <div className="mainSection__counterContainer">
                {counter}
              </div>
            </div>
          )
      }
    </div>
  );
};
