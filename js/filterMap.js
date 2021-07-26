"use strict";

// Активная/неактивная форма
export const changeFilterMap = (state) => {
  const form = document.querySelector(".map__filters");
  const selects = document.querySelectorAll(".map__filter");
  const features = document.querySelectorAll(".map__checkbox");

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
export const filterMap = (arr) => {
  let features = [];
  let filterData = arr.slice();

  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;

  const houseType = document.querySelector("#housing-type");
  const housePrice = document.querySelector("#housing-price");
  const houseRooms = document.querySelector("#housing-rooms");
  const houseGuests = document.querySelector("#housing-guests");

  // Получаем удобства
  document.querySelectorAll(".map__checkbox:checked").forEach((item) => {
    features.push(item.value);
  });

  // Фильтрация по типу жилья
  if (houseType.value !== "any") {
    filterData = filterData.filter((item) => {
      return item.offer.type === houseType.value;
    });
  }

  // Фильтрация по цене
  if (housePrice.value !== "any") {
    filterData = filterData.filter((item) => {
      let price = "middle";

      if (item.offer.price < LOW_PRICE) {
        price = "low";
      } else if (item.offer.price > HIGH_PRICE) {
        price = "high";
      }

      return price === housePrice.value;
    });
  }

  // Фильтрация по количеству комнат
  if (houseRooms.value !== "any") {
    filterData = filterData.filter((item) => {
      return item.offer.rooms === houseRooms.value;
    });
  }

  // Фильтрация по количеству гостей
  if (houseGuests.value !== "any") {
    filterData = filterData.filter((item) => {
      return item.offer.guests === houseGuests.value;
    });
  }

  // Фильтрация по удобствам
  if (features.length !== 0) {
    features.forEach((feature) => {
      filterData = filterData.filter((item) => {
        return item.offer.features.includes(feature);
      });
    });
  }

  return filterData;
};
