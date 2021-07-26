'use strict';

import { renderCard } from './renderCard.js';
import { filterMap } from './filterMap.js';

// Координаты метки и карты
const LAT = 35.681700;
const LNG = 139.75388;

// Стейт данных
let stateArray = [];

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

// Первоначальное положение главной метки
const icon = L.icon({
  iconUrl: "../img/main-pin.svg",
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const MARKER = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon,
  }
);

// Создание главной метки
const createChapterPoint = (map) => {

  MARKER.addTo(map);

  MARKER.on("moveend", (e) => {
    const NEWX = e.target.getLatLng().lat.toFixed(5);
    const NEWY = e.target.getLatLng().lng.toFixed(5);

    document.querySelector("#address").value = `${NEWX}, ${NEWY}`;
  });
};

// Возращает главную метку на первоначальную позицию
export const refreshPoint = () => {
  MARKER.setLatLng([LAT, LNG])
};

// Возращает карту на первоначальную позицию
export const refreshMap = () => {
  MAP.setView({
    lat: LAT,
    lng: LNG,
  },
  10)
};

// Создание меток с объявлениями
const createPoints = (filter = false, arr) => {
  if (Array.isArray(arr)) {
    if (filter) {
      markerGroup.clearLayers();
    }

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
  
      marker.addTo(markerGroup).bindPopup(renderCard(item), {
        keepInView: true,
      });
    });
  }
};

// Работа с картой
export const mapsChanges = (points) => {
  stateArray = points;

  createChapterPoint(MAP, LAT, LNG);
  createPoints(false, stateArray);
};

transferInactivePage();
const MAP = L.map("map-canvas")
// Если загрузилась карта, то форама становится активной
.on("load", () => {
  transferActivePage();
  document.querySelector("#address").value = `${LAT}, ${LNG}`;
})
.setView(
  {
    lat: LAT,
    lng: LNG,
  },
  10
);

localStorage.setItem('x', LAT);
localStorage.setItem('y', LNG);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
attribution:
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(MAP);

// Второй слой для отрисовки points
const markerGroup = L.layerGroup().addTo(MAP);

document.querySelector('.map__filters').addEventListener('change', (e) => {
  createPoints(true, (filterMap(stateArray)));
});