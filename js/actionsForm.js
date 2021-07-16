
const successAd = document.querySelector('#success').querySelector('.success');
const rejectAd = document.querySelector('#error').querySelector('.error');

document.querySelector('.ad-form__submit').addEventListener('click', (e) => {
    e.preventDefault();

    const data = document.querySelector('.ad-form');
    const dataName = new FormData(data);
    
    fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataName),
        })
        .then((response) => {
            if (response.ok) {
                response
                    .json()
                    .then((data) => {
                        console.log('Успех', data)
                    })
            } else {
                console.log('ошибка')
            }
        })  
});