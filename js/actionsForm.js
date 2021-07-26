import { refreshPoint, refreshMap, reloadData } from './map.js';

// Если все прошло успешно
const actionSuccess = () => {
  const successAd = document
    .querySelector('#success')
    .content.querySelector('.success')
    .cloneNode(true);
  const body = document.body;

  body.appendChild(successAd);

  body.addEventListener('click', (evt) => {
    if (evt.target.id !== successAd && body.contains(successAd)) {
      body.removeChild(successAd);
    }
  });

  body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && body.contains(successAd)) {
      body.removeChild(successAd);
    }
  });

  const form = document.querySelector('.ad-form');
  form.reset();

  document.querySelectorAll('.features__checkbox').forEach((item) => {
    item.checked = false;
  });
};

// Если произошла ошибка
const rejectAction = () => {
  const rejectAd = document
    .querySelector('#error')
    .content.querySelector('.error')
    .cloneNode(true);
  const body = document.body;

  body.appendChild(rejectAd);

  body.addEventListener('click', (evt) => {
    if (evt.target.id !== rejectAd && body.contains(rejectAd)) {
      body.removeChild(rejectAd);
    }
  });

  body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && body.contains(rejectAd)) {
      body.removeChild(rejectAd);
    }
  });
};

// Отправка формы
document.querySelector('.ad-form').addEventListener('submit', (evt) => {
  evt.preventDefault();

  const form = document.querySelector('.ad-form');
  const formData = new FormData(form);

  fetch('https://jsonplaceholder.typicode.com/posts/', {
    method: 'POST',
    body: JSON.stringify(formData),
  }).then((response) => {
    if (response.ok) {
      response.json().then(() => {
        actionSuccess();
      });
    } else {
      rejectAction();
    }
  });
});

// Загрузка аватарки
document.querySelector('#avatar').addEventListener('change', () => {
  const preview = document.querySelector('.ad-form-header__preview_avatar');
  const file = document.querySelector('#avatar').files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
});

// Загрузка изображения жилья
document.querySelector('#images').addEventListener('change', () => {
  const preview = document.querySelector('.ad-form__photo');
  const file = document.querySelector('#images').files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    preview.style.backgroundImage = `url(${reader.result})`;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.style.backgroundImage = '';
  }
});

// Сброс формы
document.querySelector('.ad-form__reset').addEventListener('click', () => {
  // Сброс формы объявления
  const form = document.querySelector('.ad-form');
  form.reset();

  // Возвращение координат
  const LAT = localStorage.getItem('x');
  const LNG = localStorage.getItem('y');

  document.querySelector('#address').value = `${LAT}, ${LNG}`;

  // Возвращение метки на первоначальное место
  refreshPoint();

  // Возврщает масштаб карты
  refreshMap();

  // Перерисовывает метки
  reloadData();

  // Убираем выделение features
  document.querySelectorAll('.features__checkbox').forEach((item) => {
    item.checked = false;
  });

  // Сброс фильтра карты
  const filterForm = document.querySelector('.map__filters');
  filterForm.reset();

  // Убираем выделение features у фильтра
  document.querySelectorAll('.map__checkbox').forEach((item) => {
    item.checked = false;
  });

  // Возвращаем аватарку в исходное состояние
  document.querySelector('.ad-form-header__preview_avatar').src =
    'img/muffin-grey.svg';

  // Возвращаем фоновое изображение в исходное состояние
  document.querySelector('.ad-form__photo').style.backgroundImage = '';

  // Делаем тип жилья и цену в первоначальный вид
  document.querySelector('.capacity0').selected = true;
  const price = document.querySelector('#price');
  price.placeholder = 0;
  price.min = 0;
});
