'use strict';

import { mapsChanges } from './map.js';
import { changeFilterMap } from './filterMap.js';

const renderData = (data) => {
    mapsChanges(data);
    changeFilterMap(true);
};

const renderDataFailed = (status) => {
    const rejectDataFailed = document.querySelector('#error-data').content.querySelector('.error-data').cloneNode(true);
    const body = document.body;

    rejectDataFailed.querySelector('.error-data__message')
        .textContent = `Упс... При загрузке страницы произошла ошибка ${status}`;

    body.appendChild(rejectDataFailed);

    body.addEventListener('click', (e) => {
        if (e.target.id !== rejectDataFailed && body.contains(rejectDataFailed)) {
            body.removeChild(rejectDataFailed);
        }
    });

    body.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.contains(rejectDataFailed)) {
            body.removeChild(rejectDataFailed);
        }
    });

    changeFilterMap(false);
};

export const dataActionsPost = () => {
    fetch(
        'https://23.javascript.pages.academy/keksobooking/data/')
        .then((resolve) => {
            if (resolve.ok) {
                resolve
                    .json()
                    .then((resolve) => {
                        const values = resolve.length <= 10 ? resolve : resolve.splice(0, 10);
                        renderData(values);
                    })
            } else {
                renderDataFailed(resolve.status);
            }
        });
};  