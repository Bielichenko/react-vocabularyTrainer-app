export function isLocalStorageSet() {
  if (localStorage.getItem('wordsStorage')) {
    return true;
  }

  return false;
}

export function getRandomWord() {
  if (isLocalStorageSet()) {
    const wordsFromStorage = JSON.parse(localStorage.getItem('wordsStorage'));
    const notLearnedWords = wordsFromStorage.filter(wordObj => wordObj.learned === false);

    const randomIndex = Math.round(Math.random() * notLearnedWords.length);

    return notLearnedWords[randomIndex];
  }

  return undefined;
}

export function wordNormalize(word) {
  return word.trim().toLowerCase();
}

export function makeFirstCapitalLetter(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

export function countWordsRemain(words) {
  const notLearnedWords = words.reduce((sum, wordObj) => {
    if (wordObj.learned === false) {
      return sum + 1;
    }

    return sum;
  }, 0);

  return notLearnedWords;
}
