import { renderCard } from "./renderCard.js";

// неактивная страница
const transferInactivePage = () => {
  document.querySelector(".ad-form").classList.add("ad-form--disabled");

  document.querySelectorAll(".ad-form fieldset").forEach((item) => {
    item.setAttribute("disabled", "disabled");
  });

  document.querySelector(".map__filters").classList.add("ad-form--disabled");

  document.querySelectorAll(".map__filters select").forEach((item) => {
    item.setAttribute("disabled", "disabled");
  });
};

// активная страница
const transferActivePage = () => {
  document.querySelector(".ad-form").classList.remove("ad-form--disabled");

  document.querySelectorAll(".ad-form fieldset").forEach((item) => {
    item.removeAttribute("disabled");
  });

  document.querySelector(".map__filters").classList.remove("ad-form--disabled");

  document.querySelectorAll(".map__filters select").forEach((item) => {
    item.removeAttribute("disabled");
  });
};

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
document.getElementById("room_number").addEventListener("click", (evt) => {
  const capacity = ROOMS_CAPACITY[evt.target.value];
  const options = document.querySelectorAll("#capacity option");

  // Отключаем все опции
  options.forEach(function (item, i) {
    document.querySelector(".capacity" + i).disabled = true;
    document.querySelector(".capacity" + i).selected = false;
  });

  // Первое подходящее значение помечаем как выделенное
  document.querySelector(".capacity" + capacity[0]).selected = true;

  // Включаем только подходящие опции
  capacity.forEach(function (item, i) {
    document.querySelector(".capacity" + capacity[i]).disabled = false;
  });
});

// Смена типа жилья
document.querySelector("#type").addEventListener("change", (e) => {
  const price = document.querySelector("#price");
  const minPrice = MIN_PRICES[e.target.value];

  price.setAttribute("placeholder", minPrice);
  price.setAttribute("max", minPrice);
});

// Смена времени выезда
document.querySelector("#timein").addEventListener("change", (e) => {
  const timeIn = e.target.value;
  document.querySelector("#timeout").value = timeIn;
});

// Смена времени приезда
document.querySelector("#timeout").addEventListener("change", (e) => {
  const timeIn = e.target.value;
  document.querySelector("#timein").value = timeIn;
});

