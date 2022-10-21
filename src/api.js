/* eslint-disable no-console */

const url = 'https://dog.ceo/api/breeds/image/random';

export async function fetchImage(setImage) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    setImage(data);
  } catch (error) {
    console.log(error);
  }
}
