// Рандомное число
const randomNumber = (min, max) => {
    if (min >= 0 && max >= 0) {
      const num = Math.floor(Math.random() * (max - min + 1) + min);
  
      return num < 0 ? randomNumber(min, max) : num;
    }
    return 0;
  };
  
  // Рандомное число с плавающей точкой
  const randomFloatNumber = (min, max, point) => {
    if (min >= 0 || max >= 0) {
      const num = parseFloat((Math.random() * (max - min) + min).toFixed(point));
  
      return num < 0 ? randomFloatNumber(min, max, point) : num;
    }
    return 0;
  };

const fillingArrObj = (arr = []) => {

  const OFFER_FEATURES = [
    'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
  ];

  const OFFER_PHOTOS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];

  // Генерирует рандомную длину и создает массив без повторений
  const createArrOffer = (arr = []) => {
    const maxLenght = Math.floor(Math.random() * arr.length | 0);
    const newArrOffer = [];

    for (let i = 0; i <= maxLenght; i++) {
      const randomItem = arr[Math.floor(Math.random() * arr.length | 0)];

      if (newArrOffer.indexOf(randomItem) === -1) {
        newArrOffer.push(randomItem);
      }
    }

    return newArrOffer;
  };

  const author = {
    avatar: `img/avatars/user0${Math.floor(Math.random() * (9 - 1) + 1)}.png`,
  };

  const offer = {
    title: 'Придумайте самостоятельно',
    address: '+26° 21′ 28.31″, +127° 47′ 1.62',
    price: Math.floor(Math.random() * (900 - 10) + 10),
    type: 'hotel',
    rooms: Math.floor(Math.random() * (50 - 10) + 10),
    guests: Math.floor(Math.random() * (50 - 10) + 10),
    checkin: '12:00',
    checkout: '13:00',
    features: createArrOffer(OFFER_PHOTOS),
    description: 'Придумайте самостоятельно',
    photos: createArrOffer(OFFER_FEATURES),
  };

  const location = {
    lat: (Math.random() * (35.65000 - 35.70000) + 35.70000).toFixed(5),
    lng: (Math.random() * (139.70000 - 139.80000) + 139.80000).toFixed(5),
  };

  arr.push(author, offer, location);

  return arr;
};

console.log(fillingArrObj());
