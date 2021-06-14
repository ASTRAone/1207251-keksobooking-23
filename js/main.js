// Это для того, чтобы можно было использовать console для вывода инфы
/* eslint-disable no-console */
import { randomNumber, randomFloatNumber } from './util.js';
import { createArrOffer } from './data.js';

// генерирование объектов
const fillingArrObj = () => {

  const OFFER_FEATURES = [
    'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
  ];

  const OFFER_PHOTOS = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];

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
    features: createArrOffer(OFFER_FEATURES),
    description: 'Придумайте самостоятельно',
    photos: createArrOffer(OFFER_PHOTOS),
  };

  const location = {
    lat: (Math.random() * (35.65000 - 35.70000) + 35.70000).toFixed(5),
    lng: (Math.random() * (139.70000 - 139.80000) + 139.80000).toFixed(5),
  };

  const obj = {
    author,
    offer,
    location,
  };

  return obj;
};

const ARR = [];
for (let startLen = 0; startLen < 10; startLen++) {
  ARR.push(fillingArrObj());
}

console.log('Массив объектов: ', ARR);
console.log('Рандомное число ', randomNumber(20, 100));
console.log('Рандомное число с плавающей точкой ', randomFloatNumber(1.3, 1.67, 5));
