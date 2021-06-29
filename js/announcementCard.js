// Генерация features
const renderFeatures = (features = [], card) => {
    const ul = card.content.querySelector('.popup__features');

    features.forEach((label) => {
        const li = document.createElement('li');
        li.innerHTML = label;
        ul.appendChild(li)
    });
};

// Генерация изображений
const renderImages = (images) => {
    const popupPhotos = card.content.querySelector('.popup__photos');
    
    images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        popupPhotos.appendChild(img);
    });
};

// Генерация типов popup__type
const renderOfferType = (type) => {
    switch(type) {
        case 'flat' : return 'Квартира';
        case 'bungalow' : return 'Бунгало';
        case 'house' : return 'Дом';
        case 'palace' : return 'Дворец';
        case 'hotel' : return 'Отель';

        default : return ''
    };
};

// Добавление определенных удобств
let addFeatures = (features, card) => { 
    const popupFeatures = card.content.querySelectorAll('.popup__feature');

    popupFeatures.forEach((item) => {
        item.style.display = 'none'; 
        features.forEach((feature) => {
            if (item.classList.contains('popup__feature--' + feature)) { 
                item.style.display = 'inline-block';
            } 
        });
    });
};

export const announcementCard = (data = []) => {
    const card = document.querySelector('#card');

    data.forEach((item) => {
        const root = card.content.cloneNode(true);

        card.content.querySelector('.popup__title').textContent = item.offer.title;
        card.content.querySelector('.popup__text--address').textContent = item.offer.address;
        card.content.querySelector('.popup__text--price').textContent = `${item.offer.price} ₽/ночь`;
        card.content.querySelector('.popup__type').textContent = renderOfferType(item.offer.type);
            'Значение не определено';
        card.content.querySelector('.popup__text--capacity').textContent = 
            `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
        card.content.querySelector('.popup__text--time').textContent = 
            `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
        renderFeatures(item.offer.features, card);
        card.content.querySelector('.popup__description').textContent = item.offer.description;
        renderImages(item.offer.photos);
        card.content.querySelector('.popup__avatar').src = item.author.avatar;

        addFeatures(item.offer.features, card)
        card.append(root);
    });
};


