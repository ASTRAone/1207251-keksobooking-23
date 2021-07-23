import { refresh } from './map.js';

// Если все прошло успешно
const successAction = () => {
    const successAd = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    const body = document.body;

    body.appendChild(successAd);

    body.addEventListener('click', (e) => {
        if (e.target.id !== successAd && body.contains(successAd)) {
            body.removeChild(successAd);
        }
    });

    body.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.contains(successAd)) {
            body.removeChild(successAd);
        }
    });
};

// Если произошла ошибка
const rejectAction = () => {
    const rejectAd = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    const body = document.body;

    body.appendChild(rejectAd);

    body.addEventListener('click', (e) => {
        if (e.target.id !== rejectAd && body.contains(rejectAd)) {
            body.removeChild(rejectAd);
        }
    });

    body.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.contains(rejectAd)) {
            body.removeChild(rejectAd);
        }
    });
};

// Отправка формы
document.querySelector('.ad-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const form = document.querySelector('.ad-form');
    const formData = new FormData(form);
        
    fetch(
        'https://jsonplaceholder.typicode.com/posts/',
        {
            method: 'POST',
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
                response
                    .json()
                    .then((data) => {
                        successAction();
                    })
            } else {
            rejectAction();
        }
    }); 
});

// Сброс формы
document.querySelector('.ad-form__reset').addEventListener('click', () => {
    // Сброс формы
    const form = document.querySelector('.ad-form');
    form.reset();
    
    // Возвращение координат
    const x = localStorage.getItem('x');
    const y = localStorage.getItem('y');

    document.querySelector('#address').value = `${x}, ${y}`;
    
    // Возвращение метки на первоначальное место
    refresh();

    // Убираем выделение features
    document.querySelectorAll('.features__checkbox').forEach((item) => {
        item.checked = false
    });
});

