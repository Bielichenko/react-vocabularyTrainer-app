import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { counterSlice } from '../../store/counterReducer';
import { imageSlice } from '../../store/imageReducer';
import { inputSlice } from '../../store/inputReducer';
import { openAnswerSlice } from '../../store/openAnswerReducer';
import { fetchImage } from '../../utils/apiAction';

import { getRandomWord, makeFirstCapitalLetter, wordNormalize } from '../../utils/functions';

let randomWord = getRandomWord();

export const TranslationBlockComponent = () => {
  const dispatch = useDispatch();
  const { isAnswerOpen } = useSelector(state => state.openAnswerReducer);
  const { counter } = useSelector(state => state.counterReducer);
  const { userInput } = useSelector(state => state.inputReducer);
  const { set__userInput } = inputSlice.actions;
  const { drop__userInput } = inputSlice.actions;
  const { increment__counter } = counterSlice.actions;
  const { drop__counter } = counterSlice.actions;
  const { show__answer } = openAnswerSlice.actions;
  const { hide__answer } = openAnswerSlice.actions;
  const { hide__image } = imageSlice.actions;

  const wordsContainer = randomWord;
  const wordToTranslate = makeFirstCapitalLetter(wordsContainer[0]);
  const rightAnswer = makeFirstCapitalLetter(wordsContainer[1]);

  const setUserInput = (currInput) => {
    dispatch(set__userInput(currInput));
  };

  const setImageFromServer = () => {
    if ((counter + 1) % 5 === 0) {
      dispatch(fetchImage());
    }
  };

  const setNewWord = () => {
    randomWord = getRandomWord();
    dispatch(drop__userInput());
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
    dispatch(hide__image());
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
    <div className="app__translationBlock translationBlock">

      {
        isAnswerOpen
          ? (
            <>
              <div className="translationBlock__wordAndAnswer">
                <span className="translationBlock__word">
                  {wordToTranslate}
                </span>
                <span className="translationBlock__answer">
                  {rightAnswer}
                </span>
              </div>
              <div className="translationBlock__inputContainer">
                <input
                  className="translationBlock__input"
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
              <div className="translationBlock__buttonSection">
                <button
                  className="translationBlock__button translationBlock__button--check"
                  type="button"
                  onClick={() => checkСorrectedInput()}
                >
                  Got it!
                </button>
              </div>
            </>

          )
          : (
            <>
              <div className="translationBlock__wordAndAnswer">
                <span className="translationBlock__word">
                  {wordToTranslate}
                </span>
              </div>
              <div className="translationBlock__inputContainer">
                <input
                  className="translationBlock__input"
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
              <div className="translationBlock__buttonSection">
                <button
                  className="translationBlock__button translationBlock__button--check"
                  type="button"
                  onClick={() => checkUserInput()}
                >
                  check
                </button>
                <button
                  className="translationBlock__button translationBlock__button--open"
                  type="button"
                  onClick={() => showAnswer()}
                >
                  I don&apos;t know
                </button>
              </div>
            </>
          )
      }
    </div>
  );
};
