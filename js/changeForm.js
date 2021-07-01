// неактивная страница
export const transferInactivePage = () => {
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    document.querySelectorAll('.ad-form fieldset').forEach((item) => {
        item.setAttribute('disabled', 'disabled');
    });
    
    document.querySelector('.map__filters').classList.add('ad-form--disabled');
    document.querySelectorAll('.map__filters select').forEach((item) => {
        item.setAttribute('disabled', 'disabled');
    });
};

// активная
export const transferActivePage = () => {
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    document.querySelectorAll('.ad-form fieldset').forEach((item) => {
        item.removeAttribute('disabled');
    });
    
    document.querySelector('.map__filters').classList.remove('ad-form--disabled');
    document.querySelectorAll('.map__filters select').forEach((item) => {
        item.removeAttribute('disabled');
    });
}