import { words } from '../words';

export function getRandomWord() {
  const randomIndex = Math.round(Math.random() * words.length);

  return words[randomIndex];
}

export function wordNormalize(word) {
  return word.trim().toLowerCase();
}

export function makeFirstCapitalLetter(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}
