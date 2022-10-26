import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { counterSlice } from '../../store/counterReducer';
import { imageSlice } from '../../store/imageReducer';
import { inputSlice } from '../../store/inputReducer';
import { isAppStartedSlice } from '../../store/isAppStartedReducer';
import { openAnswerSlice } from '../../store/openAnswerReducer';
import { wordsRemainSlice } from '../../store/wordsRemainReducer';
import { fetchImage } from '../../utils/apiAction';

import {
  countWordsRemain,
  getRandomWord,
  makeFirstCapitalLetter,
  wordNormalize,
} from '../../utils/functions';

let externalWordObject = getRandomWord();

export const TranslationBlockComponent = () => {
  const dispatch = useDispatch();
  const { isAnswerOpen } = useSelector(state => state.openAnswerReducer);
  const { counter } = useSelector(state => state.counterReducer);
  const { userInput } = useSelector(state => state.inputReducer);
  const { set__userInput } = inputSlice.actions;
  const { drop__userInput } = inputSlice.actions;
  const { increment__counter } = counterSlice.actions;
  const { drop__counter } = counterSlice.actions;
  const { set__bestScore } = counterSlice.actions;
  const { show__answer } = openAnswerSlice.actions;
  const { hide__answer } = openAnswerSlice.actions;
  const { hide__image } = imageSlice.actions;
  const { set__wordsRemain } = wordsRemainSlice.actions;
  const { set__initialWord } = isAppStartedSlice.actions;

  useEffect(() => {
    const wordsRemain = JSON.parse(localStorage.getItem('wordsRemain'));

    dispatch(set__initialWord());
    dispatch(set__wordsRemain(wordsRemain));
    externalWordObject = getRandomWord();
  }, []);

  let wordObject;
  let wordToTranslate;
  let rightAnswer;

  if (externalWordObject) {
    wordObject = externalWordObject;
    wordToTranslate = makeFirstCapitalLetter(wordObject.translatedWord);
    rightAnswer = makeFirstCapitalLetter(wordObject.translation);
  }

  const setUserInput = (currInput) => {
    dispatch(set__userInput(currInput));
  };

  const setImageFromServer = () => {
    if ((counter + 1) % 5 === 0) {
      dispatch(fetchImage());
    }
  };

  const setNewWord = () => {
    externalWordObject = getRandomWord();
    dispatch(drop__userInput());
  };

  const setRemainWords = (words) => {
    const notLearnedWordsNumber = countWordsRemain(words);

    localStorage.setItem('wordsRemain', JSON.stringify(notLearnedWordsNumber));
    dispatch(set__wordsRemain(notLearnedWordsNumber));
  };

  const saveLearnedWords = () => {
    const prevWords = JSON.parse(localStorage.getItem('wordsStorage'));
    const updatedWords = prevWords.map(wordObj => {
      const updatedWordObj = { ...wordObj, learned: true };

      return wordNormalize(wordObj.translation) === wordNormalize(userInput)
        ? updatedWordObj
        : wordObj;
    });

    localStorage.setItem('wordsStorage', JSON.stringify(updatedWords));
    setRemainWords(updatedWords);
  };

  const setNewBestScore = () => {
    const prevBestScore = JSON.parse(localStorage.getItem('bestScore'));
    const newPotentialBestScore = counter + 1;
    const bestScore = Math.max(prevBestScore, newPotentialBestScore);

    localStorage.setItem('bestScore', JSON.stringify(bestScore));
    dispatch(set__bestScore(bestScore));
  };

  const checkUserInput = () => {
    const normalizedInput = wordNormalize(userInput);
    const normalizedAnswer = wordNormalize(rightAnswer);

    if (normalizedInput === normalizedAnswer) {
      setImageFromServer();
      dispatch(increment__counter());
      setNewWord();
      saveLearnedWords();
      setNewBestScore();
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
