// Рандомное число
const randomNumber = (min, max) => {
  if (min >= 0 && max >= 0) {
    const num = Math.floor(Math.random() * (max - min + 1) + min);

    return num < 0 ? randomNumber(min, max) : num;
  }
  return 0;
};

// Рандомное число с плавающей точкой
const randomFloatNumber = (min, max, point = 6) => {
  if (min >= 0 || max >= 0) {
    const num = parseFloat((Math.random() * (max - min) + min).toFixed(point));

    return num < 0 ? randomFloatNumber(min, max, point) : num;
  }
  return 0;
};

randomNumber(2, 10);
randomFloatNumber(1, 100, 2);
