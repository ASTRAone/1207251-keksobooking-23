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

// Создание главной метки
const createChapterPoint = (map, x, y) => {
  const icon = L.icon({
    iconUrl: "../img/main-pin.svg",
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const marker = L.marker(
    {
      lat: x,
      lng: y,
    },
    {
      draggable: true,
      icon,
    }
  );

  marker.addTo(map);

  marker.on("moveend", (e) => {
    const newX = e.target.getLatLng().lat.toFixed(5);
    const newY = e.target.getLatLng().lng.toFixed(5);

    document.querySelector("#address").value = `${newX}, ${newY}`;
  });
};

// Создание меток с объявлениями
const createPoints = (map, arr) => {
  arr.forEach((item) => {
    const x = item.location.lat;
    const y = item.location.lng;

    const icon = L.icon({
      iconUrl: "../img/pin.svg",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: x,
        lng: y,
      },
      {
        icon,
      }
    );

    marker.addTo(map).bindPopup(renderCard(item), {
      keepInView: true,
    });
  });
};

// Работа с картой
export const mapsChanges = (points) => {
  // Изначально делаем форму неактивной
  transferInactivePage();

  const x = 35.68304;
  const y = 139.72364;

  const map = L.map("map-canvas")
    // Если загрузилась карта, то форама становится активной
    .on("load", () => {
      transferActivePage();
      document.querySelector("#address").value = `${x}, ${y}`;
    })
    .setView(
      {
        lat: x,
        lng: y,
      },
      10
    );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  createChapterPoint(map, x, y);
  createPoints(map, points);
};
