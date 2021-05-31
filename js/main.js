// Рандомное число
let randomNumber = (min, max) => {
  if (min >= 0 && max >= 0) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);

    return num < 0 ? randomNumber(min, max) : num;
  }
  return 0;
};

console.log(randomNumber(10, 2));

// Рандомное число с плавающей точкой
let randomFloatNumber = (min, max, point = 100) => {
  if (min >= 0 || max >= 0) {
    let num = parseFloat((Math.random() * (max - min) + min).toFixed(point));

    return num < 0 ? randomFloatNumber(min, max, point) : num;
  } 
  return 0;
}

console.log(randomFloatNumber(1.2, 0.3));