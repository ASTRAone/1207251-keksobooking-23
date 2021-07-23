const changeFilterMap = (state) => {
    const form = document.querySelector('.map__filters');
    const selecets = document.querySelectorAll('.map__filter');
    const features = document.querySelectorAll('.map__checkbox');

    if (state === false) {
        selecets.forEach((item) => {
            item.disabled = true
        });

        features.forEach((item) => {
            item.disabled = true
        });
    } else {
        selecets.forEach((item) => {
            item.disabled = false
        });

        features.forEach((item) => {
            item.disabled = false
        });

        form.reset();
    }
};

const filterMap = (data, state) => {
    changeFilterMap(state);

    const form = document.querySelector('.map__filters');
    const formData = new FormData(form);
    const features = [];

    

    console.log(features)
};