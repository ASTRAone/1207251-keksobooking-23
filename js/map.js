import { renderCard } from './renderCard.js';

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

const LAT = 35.681700;
const LNG = 139.75388;

const marker = L.marker(
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

  marker.addTo(map);

  marker.on("moveend", (e) => {
    const newX = e.target.getLatLng().lat.toFixed(5);
    const newY = e.target.getLatLng().lng.toFixed(5);

    document.querySelector("#address").value = `${newX}, ${newY}`;
  });
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

// Стейт данных
let stateArray = [];

// Работа с картой
export const mapsChanges = (points) => {
  stateArray = points;

  createChapterPoint(map, LAT, LNG);
  createPoints(false, stateArray);
};

// const x = 35.68304;
// const y = 139.72364;

transferInactivePage();
const map = L.map("map-canvas")
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
}).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

// Возращает главную метку на первоначальную позицию
export const refreshPoint = () => {
  marker.setLatLng([LAT, LNG])
};

// Возращает карту на первоначальную позицию
export const refreshMap = () => {
  map.setView({
    lat: LAT,
    lng: LNG,
  },
  10)
};

// Активная/неактивная форма
export const changeFilterMap = (state) => {
  const form = document.querySelector('.map__filters');
  const selects = document.querySelectorAll('.map__filter');
  const features = document.querySelectorAll('.map__checkbox');

  if (state === false) {
      selects.forEach((item) => {
          item.disabled = true;
      });

      features.forEach((item) => {
          item.disabled = true;
      });
  } else {
      selects.forEach((item) => {
          item.disabled = false;
      });

      features.forEach((item) => {
          item.disabled = false;
      });

      form.reset();
  }
};

// Изменения фильтра карты
const filterMap = (arr) => {
  let features = [];
  let filterData = arr.slice();

  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;

  const houseType = document.querySelector('#housing-type');
  const housePrice = document.querySelector('#housing-price');
  const houseRooms = document.querySelector('#housing-rooms');
  const houseGuests = document.querySelector('#housing-guests');

  // Получаем удобства
  document.querySelectorAll('.map__checkbox:checked').forEach((item) => {
    features.push(item.value);
  });

  // Фильтрация по типу жилья
  if (houseType.value !== 'any') {
    filterData = filterData.filter((item) => {
      return item.offer.type === houseType.value;
    });
  }

  // Фильтрация по цене
  if (housePrice.value !== 'any') {
    filterData = filterData.filter((item) => {
      let price = 'middle';

      if (item.offer.price < LOW_PRICE) {
        price = 'low';
      }

      else if (item.offer.price > HIGH_PRICE) {
        price = 'high';
      }

      return price === housePrice.value;
    });
  }

  // Фильтрация по количеству комнат
  if (houseRooms.value !== 'any') {
    filterData = filterData.filter((item) => {
      return item.offer.rooms === houseRooms.value;
    });
  }

  // Фильтрация по количеству гостей
  if (houseGuests.value !== 'any') {
    filterData = filterData.filter((item) => {
      return item.offer.guests === houseGuests.value;
    });
  }

  // Фильтрация по удобствам
  if (features.length !== 0) {
    features.forEach((feature) => {
      filterData = filterData.filter((item) => {
        return item.offer.features.includes(feature);
      })
    });
  }

  return filterData;
};

// Слушаем изменение формы
document.querySelector('.map__filters').addEventListener('change', (e) => {
  createPoints(true, (filterMap(stateArray)));
});