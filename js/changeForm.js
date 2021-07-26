const ROOMS_CAPACITY = {
  1: [1],
  2: [2, 1],
  3: [3, 2, 1],
  100: [0],
};

const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

// Выбор жилья
document.getElementById('room_number').addEventListener('click', (evt) => {
  const capacity = ROOMS_CAPACITY[evt.target.value];
  const options = document.querySelectorAll('#capacity option');

  // Отключаем все опции
  options.forEach((item, counter) => {
    document.querySelector(`.capacity${  counter}`).disabled = true;
    document.querySelector(`.capacity${  counter}`).selected = false;
  });

  // Первое подходящее значение помечаем как выделенное
  document.querySelector(`.capacity${capacity[0]}`).selected = true;

  // Включаем только подходящие опции
  capacity.forEach((item, counter) => {
    document.querySelector(`.capacity${  capacity[counter]}`).disabled = false;
  });
});

// Смена типа жилья
document.querySelector('#type').addEventListener('change', (evt) => {
  const price = document.querySelector('#price');
  const minPrice = MIN_PRICES[evt.target.value];

  price.setAttribute('placeholder', minPrice);
  price.setAttribute('min', minPrice);
});

// Смена времени выезда
document.querySelector('#timein').addEventListener('change', (evt) => {
  const timeIn = evt.target.value;
  document.querySelector('#timeout').value = timeIn;
});

// Смена времени приезда
document.querySelector('#timeout').addEventListener('change', (evt) => {
  const timeIn = evt.target.value;
  document.querySelector('#timein').value = timeIn;
});
