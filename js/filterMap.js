const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const formFilter = document.querySelector('.map__filters');
const selectsTypes = document.querySelectorAll('.map__filter');
const featuresItems = document.querySelectorAll('.map__checkbox');

const houseType = document.querySelector('#housing-type');
const housePrice = document.querySelector('#housing-price');
const houseRooms = document.querySelector('#housing-rooms');
const houseGuests = document.querySelector('#housing-guests');

// Активная/неактивная форма
export const changeFilterMap = (state) => {
  if (state === false) {
    selectsTypes.forEach((item) => {
      item.disabled = true;
    });

    featuresItems.forEach((item) => {
      item.disabled = true;
    });
  } else {
    selectsTypes.forEach((item) => {
      item.disabled = false;
    });

    featuresItems.forEach((item) => {
      item.disabled = false;
    });

    formFilter.reset();
  }
};

// Изменения фильтра карты
export const filterMap = (arr) => {
  const features = [];
  let filterData = arr.slice();

  // Получаем удобства
  document.querySelectorAll('.map__checkbox:checked').forEach((item) => {
    features.push(item.value);
  });

  // Фильтрация по типу жилья
  if (houseType.value !== 'any') {
    filterData = filterData.filter((item) => item.offer.type === houseType.value);
  }

  // Фильтрация по цене
  if (housePrice.value !== 'any') {
    filterData = filterData.filter((item) => {
      let price = 'middle';

      if (item.offer.price < LOW_PRICE) {
        price = 'low';
      } else if (item.offer.price > HIGH_PRICE) {
        price = 'high';
      }

      return price === housePrice.value;
    });
  }

  // Фильтрация по количеству комнат
  if (houseRooms.value !== 'any') {
    filterData = filterData.filter((item) => item.offer.rooms === houseRooms.value);
  }

  // Фильтрация по количеству гостей
  if (houseGuests.value !== 'any') {
    filterData = filterData.filter((item) => item.offer.guests === houseGuests.value);
  }

  // Фильтрация по удобствам
  if (features.length !== 0) {
    features.forEach((feature) => {
      filterData = filterData.filter((item) => item.offer.features.includes(feature));
    });
  }

  return filterData;
};
