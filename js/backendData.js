import { mapsChanges } from './map.js';

const renderData = (data) => {
    mapsChanges(data);
}

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

    mapsChanges();
};

export const dataActionsPost = () => {
    fetch(
        'https://23.javascript.pages.academy/keksobooking/data/')
        .then((resolve) => {
            if (resolve.ok) {
                resolve
                    .json()
                    .then((resolve) => {
                        renderData(resolve)
                    })
            } else {
                renderDataFailed(resolve.status);
            }
        });
};  