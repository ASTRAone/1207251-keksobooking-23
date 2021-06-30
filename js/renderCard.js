// Генерация изображений
const renderImages = (images, card) => {
    const popupPhotos = card.querySelector('.popup__photos');
    popupPhotos.innerHTML = '';
    
    images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Фотография жилья';
        img.classList.add('popup__photo');
        img.style.width = '45px';
        img.style.height = '40px';

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

        default : return '';
    };
};

// Добавление определенных удобств
const addFeatures = (features, card) => { 
    const popupFeatures = card.querySelectorAll('.popup__feature');

    popupFeatures.forEach((item) => {
        item.style.display = 'none'; 
        features.forEach((feature) => {
            if (item.classList.contains('popup__feature--' + feature)) { 
                item.style.display = 'inline-block';
            } 
        });
    });
};

export const renderCard = (obj = []) => {
    const card = document.querySelector('#card');
    const root = card.content.cloneNode(true);
    
    root.querySelector('.popup__title').textContent = obj.offer.title;
    root.querySelector('.popup__text--address').textContent = obj.offer.address;
    root.querySelector('.popup__text--price').textContent = `${obj.offer.price} ₽/ночь`;
    root.querySelector('.popup__type').textContent = renderOfferType(obj.offer.type);
        'Значение не определено';
    root.querySelector('.popup__text--capacity').textContent = 
        `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
    root.querySelector('.popup__text--time').textContent = 
        `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
    root.querySelector('.popup__description').textContent = obj.offer.description;
    renderImages(obj.offer.photos, root);
    root.querySelector('.popup__avatar').src = obj.author.avatar;
    addFeatures(obj.offer.features, root);
    
    return root;
};