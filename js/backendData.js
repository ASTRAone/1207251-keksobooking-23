import { mapsChanges } from './map.js';
import { changeFilterMap } from './filterMap.js';

const renderData = (data) => {
  mapsChanges(data);
  changeFilterMap(true);
};

const renderDataFailed = (status) => {
  const rejectDataFailed = document
    .querySelector('#error-data')
    .content.querySelector('.error-data')
    .cloneNode(true);
  const body = document.body;

  rejectDataFailed.querySelector(
    '.error-data__message',
  ).textContent = `Упс... При загрузке страницы произошла ошибка ${status}`;

  body.appendChild(rejectDataFailed);

  body.addEventListener('click', (evt) => {
    if (evt.target.id !== rejectDataFailed && body.contains(rejectDataFailed)) {
      body.removeChild(rejectDataFailed);
    }
  });

  body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && body.contains(rejectDataFailed)) {
      body.removeChild(rejectDataFailed);
    }
  });

  changeFilterMap(false);
};

export const dataActionsPost = () => {
  fetch('https://23.javascript.pages.academy/keksobooking/data/').then(
    (resolve) => {
      if (resolve.ok) {
        resolve.json().then((data) => {
          const values = data.length <= 10 ? data : data.splice(0, 10);
          renderData(values);
        });
      } else {
        renderDataFailed(resolve.status);
      }
    },
  );
};
