

// Это для того, чтобы можно было использовать console для вывода инфы
/* eslint-disable no-console */
import { randomNumber, randomFloatNumber } from './util.js';
import { fillingArrObj } from './data.js';
// import { mapsChanges } from './map.js';
import { dataActionsPost } from './backendData.js';
import './changeForm.js';
import './actionsForm.js';

console.log('Рандомное число ', randomNumber(20, 100));
console.log('Рандомное число с плавающей точкой ', randomFloatNumber(1.3, 1.67, 5));

dataActionsPost();
