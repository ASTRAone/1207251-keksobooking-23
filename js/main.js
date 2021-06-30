// Это для того, чтобы можно было использовать console для вывода инфы
/* eslint-disable no-console */
import { randomNumber, randomFloatNumber } from './util.js';
import { fillingArrObj } from './data.js';
import { announcementCard } from './announcementCard.js';

console.log('Рандомное число ', randomNumber(20, 100));
console.log('Рандомное число с плавающей точкой ', randomFloatNumber(1.3, 1.67, 5));

const arrObjTest = fillingArrObj(5);
const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.append(announcementCard(arrObjTest[0]));