

const OFFER_FEATURES = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const OFFER_LOADGING = [
  'flat',
  'bungalow',
  'house',
  'palace',
  'hotel',
];

// Рандомит массив со случайной длинной и случайными данными из переденного массива
const createArrOffer = (arr = []) => {
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

// генерирование объектов
export const fillingArrObj = (amountElements) => {
  const ARR = [];

  for (let lenElements = 0; lenElements < amountElements; lenElements++) {
    const author = {
      avatar: `img/avatars/user0${Math.floor(Math.random() * (9 - 1) + 1)}.png`,
    };

    const offer = {
      title: 'Придумайте самостоятельно',
      address: '+26° 21′ 28.31″, +127° 47′ 1.62',
      price: Math.floor(Math.random() * (900 - 10) + 10),
      type: OFFER_LOADGING[Math.floor(Math.random() * OFFER_LOADGING.length)],
      rooms: Math.floor(Math.random() * (50 - 10) + 10),
      guests: Math.floor(Math.random() * (50 - 10) + 10),
      checkin: '12:00',
      checkout: '13:00',
      features: createArrOffer(OFFER_FEATURES),
      description: 'Придумайте самостоятельно',
      photos: createArrOffer(OFFER_PHOTOS),
    };

    const location = {
      lat: (Math.random() * (35.65000 - 35.70000) + 35.70000).toFixed(5),
      lng: (Math.random() * (139.70000 - 139.80000) + 139.80000).toFixed(5),
    };

    ARR.push({author, offer, location});
  }

  return ARR;
};
