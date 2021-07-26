import { mapsChanges } from './map.js';
import { transitionFilterMap } from './filterMap.js';

const renderData = (data) => {
  mapsChanges(data);
  transitionFilterMap(true);
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

  transitionFilterMap(false);
};

export const actionsDataPost = () => {
  fetch('https://23.javascript.pages.academy/keksobooking/data/').then(
    (resolve) => {
      if (resolve.ok) {
        resolve.json().then((data) => {
          renderData(data);
        });
      } else {
        renderDataFailed(resolve.status);
      }
    },
  );
};
