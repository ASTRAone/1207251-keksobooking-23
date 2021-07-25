import { refreshPoint, refreshMap } from './map.js';

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

    console.log(document.querySelector('.ad-form-header__input').value)
        
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

// Загрузка аватарки
document.querySelector('#avatar').addEventListener('change', (e) => {
    const preview = document.querySelector('.ad-form-header__preview_avatar');
    const file    = document.querySelector('#avatar').files[0];
    const reader  = new FileReader();

    reader.onloadend = () => {
        preview.src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    } 
});

// Загрузка изображения жилья
document.querySelector('#images').addEventListener('change', (e) => {
    const preview = document.querySelector('.ad-form__photo');
    const file    = document.querySelector('#images').files[0];
    const reader  = new FileReader();
    
    reader.onloadend = () => {
        preview.style.backgroundImage = `url(${reader.result})`;
    };

    if (file) {
        reader.readAsDataURL(file);
    } 
});

// Сброс формы
document.querySelector('.ad-form__reset').addEventListener('click', () => {
    // Сброс формы объявления
    const form = document.querySelector('.ad-form');
    form.reset();
    
    // Возвращение координат
    const x = localStorage.getItem('x');
    const y = localStorage.getItem('y');

    document.querySelector('#address').value = `${x}, ${y}`;
    
    // Возвращение метки на первоначальное место
    refreshPoint();

    // Возврщает масштаб карты
    refreshMap();

    // Убираем выделение features
    document.querySelectorAll('.features__checkbox').forEach((item) => {
        item.checked = false
    });

    // Сброс фильтра карты
    const filterForm = document.querySelector('.map__filters');
    filterForm.reset();

    // Убираем выделение features у фильтра
    document.querySelectorAll('.map__checkbox').forEach((item) => {
        item.checked = false;
    });
});