// Рандомит массив со случайной длинной и случайными данными из переденного массива
export const createArrOffer = (arr = []) => {
  const maxLenght = Math.floor(Math.random() * arr.length | 0);
  const newArrOffer = [];

  for (let startLen = 0; startLen <= maxLenght; startLen++) {
    const randomItem = arr[Math.floor(Math.random() * arr.length | 0)];

    if (newArrOffer.indexOf(randomItem) === -1) {
      newArrOffer.push(randomItem);
    }
  }

  return newArrOffer;
};
